import { onWatcherCleanup } from "vue";

export default function useGetSongLyric() {
   const store = usePlayerStore();
   const { audioEle, currentSong, tab } = storeToRefs(store);

   const config = useRuntimeConfig();

   const isFetching = ref(false);
   const lyrics = ref<Lyric[]>([]);

   let ranGetLyric = false;
   let timeOutId: NodeJS.Timeout | null = null;
   let isSongLoaded = false;

   const getLyrics = async () => {
      try {
         if (!currentSong.value) return;

         isFetching.value = true;

         const { data } = await useFetch<{ data: { lyrics: string } }>(
            `${config.public.apiBase}/song-lyrics?song_id=${currentSong.value.id}`
         );

         if (data) {
            const parseLyrics = JSON.parse(data.value?.data?.lyrics || "[]") as Lyric[];
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
   };

   const handleSongLoaded = () => {
      isSongLoaded = true;
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

         if (!lyrics.value.length && !ranGetLyric) {
            ranGetLyric = true;

            timeOutId = setTimeout(getLyrics, 1000);
         }
      }
   });

   watch(
      [currentSong],
      () => {
         onWatcherCleanup(resetForNewSong);
      },
      { immediate: true }
   );

   return { isFetching, lyrics };
}
