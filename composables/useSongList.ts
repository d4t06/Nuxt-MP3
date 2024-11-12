import { onWatcherCleanup, type Ref } from "@vue/reactivity";

type Props = {
   tab: Ref<Tab>;
   back: () => void;
};

export default function useSongListEvent({ tab, back }: Props) {
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

      back();
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
