import { extractToken } from "./login.post";
import { decode } from "jsonwebtoken";

export default eventHandler(async (event) => {
   const authorizationHeader = getRequestHeader(event, "Authorization");





   if (typeof authorizationHeader === "undefined") {
      throw createError({
         statusCode: 403,
         statusMessage:
            "Need to pass valid Bearer-authorization header to access this endpoint",
      });
   }

   const extractedToken = extractToken(authorizationHeader);

   console.log(decode(extractedToken));

   return {
      token: extractedToken,
      username: "admin",
   };
});
