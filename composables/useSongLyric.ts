import { onWatcherCleanup } from "vue";

type Props = {
   lyrics: Ref<Lyric[]>;
};

const LYRIC_TIME_BOUNDED = 0.3;

export default function useSongLyric({ lyrics }: Props) {
   const store = usePlayerStore();
   const { audioEle, tab } = storeToRefs(store);

   const currentLyricIndex = ref(0);
   const lyricRefs = ref<HTMLCollection>();

   let currentTime = 0;
   let scrollBehavior: ScrollBehavior = "smooth";

   const handleTimeUpdate = () => {
      if (!audioEle.value || !lyricRefs.value) return;

      const direction = audioEle.value.currentTime > currentTime ? "forward" : "backward";

      currentTime = audioEle.value.currentTime;

      let nextIndex = currentLyricIndex.value;

      switch (direction) {
         case "forward":
            while (
               lyrics.value[nextIndex + 1] &&
               lyrics.value[nextIndex + 1].start - LYRIC_TIME_BOUNDED <
                  currentTime + LYRIC_TIME_BOUNDED
            ) {
               nextIndex += 1;
            }
            break;

         case "backward":
            while (
               lyrics.value[nextIndex - 1] &&
               lyrics.value[nextIndex - 1].end - LYRIC_TIME_BOUNDED >
                  currentTime + LYRIC_TIME_BOUNDED
            ) {
               nextIndex -= 1;
            }
            break;
      }

      if (nextIndex !== currentLyricIndex.value) {
         // make scroll instantly
         if (Math.abs(nextIndex - currentLyricIndex.value) > 5)
            scrollBehavior = "instant";

         currentLyricIndex.value = nextIndex;
         currentLyricIndex.value = nextIndex;

         if (lyricRefs.value[nextIndex]) {
            console.log(lyricRefs.value.length);

            lyricRefs.value[nextIndex].scrollIntoView({
               behavior: scrollBehavior,
               block: "center",
            });

            if (scrollBehavior === "instant") scrollBehavior = "smooth";
         }
      }
   };

   // Add event to get current time
   watchEffect(() => {
      if (!audioEle.value || tab.value !== "lyric" || !lyrics.value.length) return;

      audioEle.value?.addEventListener("timeupdate", handleTimeUpdate);

      onWatcherCleanup(() => {
         audioEle.value?.removeEventListener("timeupdate", handleTimeUpdate);
      });
   });

   watchEffect(
      () => {
         if (!lyrics.value.length) return;

         const lyricContainer = document.querySelector(".lyric-container");
         if (lyricContainer) lyricRefs.value = lyricContainer.children;
      },
      {
         flush: "post",
      }
   );

   return { currentLyricIndex, lyricRefs };
}
