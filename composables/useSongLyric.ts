import { onWatcherCleanup } from "vue";

type Props = {
   lyrics: Lyric[];
};

const LYRIC_TIME_BOUNDED = 0.3;

export default function useSongLyric({ lyrics }: Props) {
   const store = usePlayerStore();
   const { audioEle, tab } = storeToRefs(store);

   const currentTime = ref(0);
   const currentLyricIndex = ref(0);

   const scrollBehavior = ref<ScrollBehavior>("smooth");
   const lyricRefs = ref<HTMLDivElement[]>([]);

   const handleTimeUpdate = () => {
      if (!audioEle.value) return;

      const direction =
         audioEle.value.currentTime > currentTime.value ? "forward" : "backward";

      currentTime.value = audioEle.value.currentTime;

      let nextIndex = currentLyricIndex.value;

      switch (direction) {
         case "forward":
            while (
               lyrics[nextIndex + 1] &&
               lyrics[nextIndex + 1].start - LYRIC_TIME_BOUNDED <
                  currentTime.value + LYRIC_TIME_BOUNDED
            ) {
               nextIndex += 1;
            }
            break;

         case "backward":
            while (
               lyrics[nextIndex - 1] &&
               lyrics[nextIndex - 1].end - LYRIC_TIME_BOUNDED >
                  currentTime.value + LYRIC_TIME_BOUNDED
            ) {
               nextIndex -= 1;
            }
            break;
      }

      if (nextIndex !== currentLyricIndex.value) {
         // make scroll instantly
         if (Math.abs(nextIndex - currentLyricIndex.value) > 5)
            scrollBehavior.value = "instant";

         currentLyricIndex.value = nextIndex;
         currentLyricIndex.value = nextIndex;

         if (lyricRefs.value[nextIndex]) {
            lyricRefs.value[nextIndex].scrollIntoView({
               behavior: scrollBehavior.value,
               block: "center",
            });

            if (scrollBehavior.value === "instant") scrollBehavior.value = "smooth";
         }
      }
   };

   // Add event to get current time
   watchEffect(() => {
      if (!audioEle.value || tab.value !== "lyric" || !lyrics.length) return;

      audioEle.value?.addEventListener("timeupdate", handleTimeUpdate);

      onWatcherCleanup(() => {
         audioEle.value?.removeEventListener("timeupdate", handleTimeUpdate);
      });
   });

   return { lyricRefs, currentLyricIndex };
}
