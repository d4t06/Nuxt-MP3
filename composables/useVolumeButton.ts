import { getLocalStorage, setLocalStorage } from "~/share/libs/localStorage";
import useDebounce from "./useDebounce";

export default function useVolume() {
   const store = usePlayerStore();
   const { audioEle } = storeToRefs(store);

   const isMute = ref(false);
   const volume = ref(1);

   const volumeHolderRef = ref<HTMLDivElement>();
   const volumeLineRef = ref<HTMLDivElement>();

   const debounceVolume = useDebounce<number>(volume, 500, 0);

   const handleSetVolume = (e: MouseEvent) => {
      const node = e.target as HTMLElement;
      const clientRect = node.getBoundingClientRect();

      const volumeLineEle = volumeLineRef.value;

      if (volumeLineEle) {
         let newVolume = +(
            (volumeLineEle.clientHeight - (e.clientY - clientRect.y)) /
            volumeLineEle.clientHeight
         ).toFixed(2);

         if (newVolume > 0.9) newVolume = 1;
         else if (newVolume < 0.05) newVolume = 0;

         volume.value = newVolume;
      }
   };

   const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const FACTOR = 0.05;
      let newVolume = volume.value;

      // scroll down
      if (e.deltaY > 0) {
         if (newVolume - FACTOR > 0) newVolume -= FACTOR;
         else newVolume = 0;
      } else {
         if (newVolume + FACTOR < 1) newVolume += FACTOR;
         else newVolume = 1;
      }

      volume.value = +newVolume.toFixed(2);
   };

   const handleMute = () => {
      isMute.value = !isMute.value;
   };

   // get local storage
   watch(
      [() => 0],
      () => {
         const localVolume = getLocalStorage()["volume"];
         volume.value = !localVolume || isNaN(+localVolume) ? 1 : +localVolume;
      },
      { immediate: true },
   );

   watch([isMute], () => {
      if (!audioEle.value) return;

      audioEle.value.muted = isMute.value;
   });

   watch([debounceVolume], () => {
      if (debounceVolume.value !== undefined)
         setLocalStorage("volume", debounceVolume.value);
   });

   watchEffect(() => {
      if (volume.value === 0) isMute.value = true;
      else isMute.value = false;

      if (audioEle.value && volumeLineRef.value && volumeHolderRef.value) {
         const ratio = volume.value * 100;

         audioEle.value.volume = volume.value;
         volumeLineRef.value.style.background = `linear-gradient(to top, rgb(253, 230, 138) ${ratio}%, white ${ratio}%, white 100%)`;
         volumeHolderRef.value.style.bottom = `${ratio}%`;
      }
   });

   return {
      volume,
      isMute,
      handleMute,
      handleWheel,
      handleSetVolume,
      volumeHolderRef,
      volumeLineRef,
   };
}
