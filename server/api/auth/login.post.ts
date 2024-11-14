/**
 * Tokens storage.
 * You will need to implement your own, connect with DB/etc.
 */

import { API_ENDPOINT } from "~/share/libs/appHelper";

import jwt from "jsonwebtoken";
import { AUTH_TOKEN_EXPIRE, CLIENT_TOKEN_EXPIRE } from "~/constants";

export type JwtPayload = {
   token: string;
   tokenExpired: number;
};

export default eventHandler(async (event) => {
   const body = (await readBody(event)) as { password: string };

   const res = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ password: body.password }),
      headers: {
         "Content-type": "application/json",
      },
   });

   const payload = (await res.json()) as {
      data: JwtPayload;
   };

   if (!res.ok)
      throw createError({
         statusCode: 403,
         statusMessage: "Unauthorized",
      });

   const {
      data: { token },
   } = payload;

   const nextAuthToken = jwt.sign(
      {
         token,
         tokenExpired: Date.now() + CLIENT_TOKEN_EXPIRE * 1000,
      } as JwtPayload,
      process.env.NUXTAUTH_SECRET!,
      {
         expiresIn: AUTH_TOKEN_EXPIRE,
      }
   );

   return { token: nextAuthToken };
});

export function extractToken(authorizationHeader: string) {
   return authorizationHeader.startsWith("Bearer ")
      ? authorizationHeader.slice(7)
      : authorizationHeader;
}
