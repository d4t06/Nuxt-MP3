import { onWatcherCleanup, type Ref } from "@vue/reactivity";

export default function useSongListEvent() {
   const store = usePlayerStore();
   const { tab } = storeToRefs(store);

   const songListRef = ref<HTMLDivElement>();

   const scroll = (el: Element) => {
      el.scrollIntoView({
         behavior: "instant",
         block: "center",
      });
   };

   const handleWindowClick: EventListener = (e) => {
      const $ = document.querySelector.bind(document);

      const buttons = [$(".queue-btn")];
      const target = e.target as Node;

      if (
         !songListRef.value ||
         songListRef.value?.contains(target) ||
         !!buttons.find((btn) => btn?.contains(target))
      )
         return;

      store.tab = "playing";
   };

   watchEffect(() => {
      if (tab.value !== "queue") return;

      const activeSongEle = document.querySelector(".active-song-item");
      if (activeSongEle) scroll(activeSongEle);

      window.addEventListener("click", handleWindowClick);

      onWatcherCleanup(() => {
         window.removeEventListener("click", handleWindowClick);
      });
   });

   return { songListRef };
}
