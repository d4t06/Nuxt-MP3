import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
   const firebaseConfig = {
      apiKey: process.env.APIKEY,
      appId: "1:938280289868:web:e36c48cfbd55e4a8de96e",
      projectId: "zingmp3-clone-61799",
      authDomain: "zingmp3-clone-61799.firebaseapp.com",
   };

   const app = initializeApp(firebaseConfig);
   const firestore = getFirestore(app);

   return {
      provide: {
         firestore,
      },
   };
});
