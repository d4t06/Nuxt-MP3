import { onWatcherCleanup } from "vue";
import { getLocalStorage, setLocalStorage } from "~/share/libs/localStorage";

type Props = {
   isPlaying: boolean;
};

export default function useTimer({ isPlaying }: Props) {
   const store = usePlayerStore();

   const { audioEle } = storeToRefs(store);

   // store user timer, decide add song event or not
   const isActive = ref(0);
   const countDown = ref(0); // count down

   const isEnd = ref(false);

   const play = async () => {
      try {
         await audioEle.value?.play();
      } catch (error) {}
   };

   const clearTimer = () => {
      setLocalStorage("timer", 0);
      isActive.value = 0;
      isEnd.value = true;

      countDown.value = 0;
   };

   const handleSongEnd = () => {
      if (countDown.value - 1 > 0) {
         setLocalStorage("timer", countDown.value - 1);
         countDown.value = countDown.value - 1;
      } else clearTimer();
   };

   // load localStorage
   watchEffect(() => {
      console.log("init");

      const timer = getLocalStorage()["timer"] || 0;
      isActive.value = timer;
      isActive.value = timer;
   });

   // add audio event
   watchEffect(() => {
      if (!isActive.value) return;

      audioEle.value?.addEventListener("ended", handleSongEnd);

      onWatcherCleanup(() => {
         audioEle.value?.removeEventListener("ended", handleSongEnd);
      });
   });

   // handle user click
   watchEffect(() => {
      /** loadLocalStorage:  loadStorage() => setActive(), setCountDown() */
      /** manual: user choose timer => setIsActive() => setCountDown() */
      if (!isActive.value) return;

      if (!countDown.value) {
         countDown.value = isActive.value;
         setLocalStorage("timer", isActive.value);

         if (!isPlaying) play();
      }
   });

   return { countDown, clearTimer, isActive };
}
