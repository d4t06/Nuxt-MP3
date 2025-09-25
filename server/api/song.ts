import { FieldPath } from "firebase-admin/firestore";
import { defineEventHandler } from "h3";
import { db } from "../firebase";

function mergeSortedArrays(arr1: Song[], arr2: Song[]) {
   let mergedArray = [];
   let i = 0;
   let j = 0;

   while (i < arr1.length && j < arr2.length) {
      if (arr1[i].first_letter <= arr2[j].first_letter) {
         mergedArray.push(arr1[i]);
         i++;
      } else {
         mergedArray.push(arr2[j]);
         j++;
      }
   }

   while (i < arr1.length) {
      mergedArray.push(arr1[i]);
      i++;
   }

   while (j < arr2.length) {
      mergedArray.push(arr2[j]);
      j++;
   }

   return mergedArray;
}

function sortMultiSongLists(arrays: Song[][]) {
   if (arrays.length === 0) {
      return [];
   }
   let mergedResult = arrays[0];
   for (let i = 1; i < arrays.length; i++) {
      mergedResult = mergeSortedArrays(mergedResult, arrays[i]);
   }
   return mergedResult;
}

export default defineEventHandler(async () => {
   // const db = getFirestore();

   const playlistSnap = await db
      .collection("Playlists")
      .doc("rNSgjVwKRlQIR2O2qZ45")
      .get();

   if (playlistSnap.exists) {
      type Playlist = {
         song_ids: string[];
      };

      const playlist = playlistSnap.data() as Playlist;

      if (!playlist.song_ids) return [];

      const chunkSize = 20;
      const chunks: string[][] = [];
      for (let i = 0; i < playlist.song_ids.length; i += chunkSize) {
         chunks.push(playlist.song_ids.slice(i, i + chunkSize));
      }

      const playlistSongs: Song[][] = [];

      for (const chunk of chunks) {
         if (chunk.length > 0) {
            const songsSnap = await db
               .collection("Songs")
               .where(FieldPath.documentId(), "in", chunk)
               .orderBy("first_letter")
               .get();

            if (!!songsSnap.docs.length) {
               const result = songsSnap.docs.map((doc) => {
                  const song = { ...doc.data(), id: doc.id } as Song;
                  return song;
               });

               playlistSongs.push(result);
            }
         }
      }

      if (playlistSongs.length === 1) return playlistSongs[0];

      return sortMultiSongLists(playlistSongs);
   }

   return [];
});
