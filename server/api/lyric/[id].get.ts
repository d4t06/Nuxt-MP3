import { defineEventHandler } from "h3";
import { db } from "~/server/firebase";
import { _Song } from "~/share/types";

export default defineEventHandler(async (event) => {
   const id = getRouterParam(event, "id");
   if (!id) return;

   const lyricSnap = await db.collection("Lyrics").doc(id).get();

   if (lyricSnap.exists) {
      return lyricSnap.data();
   }
});
