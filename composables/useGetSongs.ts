import {
   collection,
   doc,
   documentId,
   getDoc,
   getDocs,
   orderBy,
   query,
   where,
} from "firebase/firestore";


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

export default function useGetSongs() {
   const { $firestore } = useNuxtApp();

   const getSongs = async () => {
      console.log($firestore);

      return [];

      const playlistSnap = await getDoc(
         doc($firestore, "Playlists", "rNSgjVwKRlQIR2O2qZ45"),
      );

      if (playlistSnap.exists()) {
         type Playlist = {
            song_ids: string[];
         };

         const playlist = playlistSnap.data() as Playlist;

         if (!playlist.song_ids) return [];

         const chunkSize = 20;
         const chunks = [];
         for (let i = 0; i < playlist.song_ids.length; i += chunkSize) {
            chunks.push(playlist.song_ids.slice(i, i + chunkSize));
         }

         const playlistSongs: Song[][] = [];

         for (const chunk of chunks) {
            if (chunk.length > 0) {
               const queryGetSongs = query(
                  collection($firestore, "Songs"),
                  where(documentId(), "in", chunk),
                  orderBy("first_letter"),
               );

               const songsSnap = await getDocs(queryGetSongs);

               if (songsSnap.docs) {
                  const result = songsSnap.docs.map((doc) => {
                     const song = doc.data() as Song;
                     return song;
                  });

                  playlistSongs.push(result);
               }
            }
         }

         if (playlistSongs.length === 1) return playlistSongs[0];

         return sortMultiSongLists(playlistSongs);
      }
   };

   return getSongs;
}
