export const usePlayerStore = defineStore("player", () => {
   const currentIndex = ref<number | null>(null);
   const songs = ref<Song[]>([]);

   const audioEle = ref<HTMLAudioElement | null>(null);
   const tab = ref<Tab>("playing");

   const currentSong = computed(() =>
      currentIndex.value !== null ? songs.value[currentIndex.value] : null
   );

   return { currentIndex, tab, songs, currentSong, audioEle };
});
