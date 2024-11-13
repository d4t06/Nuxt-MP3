import { extractToken, tokensByUser } from "./login.post";

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

   if (tokensByUser.token !== extractedToken) {
      throw createError({
         statusCode: 401,
         statusMessage: "Unauthorized, user is not logged in",
      });
   }

   return {
      token: tokensByUser.token,
      username: "admin",
   };
});
