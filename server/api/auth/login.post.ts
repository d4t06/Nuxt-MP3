interface TokensByUser {
   token: string;
   refresh_token: string;
}

/**
 * Tokens storage.
 * You will need to implement your own, connect with DB/etc.
 */

const CLIENT_TOKEN_EXPIRE = 60 * 60; //1h

export default eventHandler(async (event) => {
   const body = (await readBody(event)) as { password: string };

   const res = await fetch(`${process.env.NUXT_PUBLIC_API_BASE}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ password: body.password }),
      headers: {
         "Content-type": "application/json",
      },
   });

   const payload = (await res.json()) as {
      data: { token: string; refresh_token: string };
   };

   if (!res.ok)
      throw createError({
         statusCode: 403,
         statusMessage: "Unauthorized",
      });

   const {
      data: { refresh_token, token },
   } = payload;

   return {
      token: token,
   };
});

export function extractToken(authorizationHeader: string) {
   return authorizationHeader.startsWith("Bearer ")
      ? authorizationHeader.slice(7)
      : authorizationHeader;
}
