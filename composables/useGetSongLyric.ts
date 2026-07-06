import { onWatcherCleanup } from "vue";
// import { useAPI } from "./useAPI";

export default function useGetSongLyric() {
   const { $api } = useNuxtApp();
   const store = usePlayerStore();
   const { audioEle, currentSong, tab } = storeToRefs(store);

   const config = useRuntimeConfig();

   const isFetching = ref(false);
   const lyrics = ref<Lyric[]>([]);

   let ranGetLyric = false;
   let timeOutId: NodeJS.Timeout | null = null;
   let isSongLoaded = ref(false);

   const getLyrics = async () => {
      try {
         if (!currentSong.value || !currentSong.value.lyric_id) return;

         isFetching.value = true;

         const { data } = await $api<{ data: { lyrics: string } }>(
            `/lyrics/${currentSong.value.lyric_id}`,
            {
               baseURL: config.public.apiBase,
            },
         );

         if (data) {
            const parseLyrics = JSON.parse(data.lyrics || "[]") as Lyric[];
            lyrics.value = parseLyrics;
         }
      } catch (error) {
         console.log(error);
      } finally {
         isFetching.value = false;
      }
   };

   const resetForNewSong = () => {
      if (timeOutId) clearTimeout(timeOutId);
      isFetching.value = true;
      lyrics.value = [];
      ranGetLyric = false;
      isSongLoaded.value = false;
   };

   const handleSongLoaded = () => {
      isSongLoaded.value = true;
   };

   watchEffect(() => {
      audioEle.value?.addEventListener("loadeddata", handleSongLoaded);

      onWatcherCleanup(() => {
         audioEle.value?.removeEventListener("loadeddata", handleSongLoaded);
      });
   });

   // get lyric
   watchEffect(() => {
      if (tab.value === "lyric") {
         // scroll active song to center when switch tab
         // const activeLyric = document.querySelector(".active-lyric");
         // if (activeLyric) {
         //    activeLyric.scrollIntoView({
         //       behavior: "instant",
         //       block: "center",
         //    });
         // }

         if (!lyrics.value.length && !ranGetLyric && isSongLoaded.value) {
            ranGetLyric = true;

            getLyrics();
         }
      }
   });

   watch(
      [currentSong],
      () => {
         onWatcherCleanup(resetForNewSong);
      },
      { immediate: true },
   );

   return { isFetching, lyrics };
}
