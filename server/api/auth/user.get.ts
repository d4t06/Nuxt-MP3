import { extractToken, JwtPayload } from "./login.post";
import jwt from "jsonwebtoken";

export default eventHandler(async (event) => {
   const authorizationHeader = getRequestHeader(event, "Authorization");

   if (typeof authorizationHeader === "undefined") {
      throw createError({
         statusCode: 403,
         statusMessage: "Authorization header no provided",
      });
   }

   const extractedToken = extractToken(authorizationHeader);
   const payload = jwt.verify(extractedToken, process.env.NUXTAUTH_SECRET!) as JwtPayload;

   if (payload.tokenExpired < Date.now()) {
      console.error(">>> token expired");

      throw createError({
         statusCode: 401,
         statusMessage: "Token is expired",
      });
   }

   return { token: payload.token };
});
