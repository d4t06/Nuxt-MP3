import { onWatcherCleanup } from "vue";

type Props = {
   content: Ref<string>;
};

export default function useScrollText({ content }: Props) {
   const autoScrollTimerId = ref<NodeJS.Timeout>();
   const unScrollTimerId = ref<NodeJS.Timeout>();

   const isOverflow = ref(false); // prevent unNecessary method call

   const duration = ref(0);
   const distance = ref(0);

   const textRef = ref<HTMLDivElement>();
   const textWrapperRef = ref<HTMLDivElement>();

   const unScroll = () => {
      if (!textRef.value) return;

      textRef.value.style.transition = `none`;
      textRef.value.style.transform = `translateX(0)`;
   };

   const scroll = () => {
      if (!textRef.value) return;

      textRef.value.style.transition = `transform linear ${duration.value}s`;
      textRef.value.style.transform = `translateX(-${distance.value}px)`;

      unScrollTimerId.value = setTimeout(unScroll, duration.value * 1000);
   };

   const calc = () => {
      if (!textRef.value || !textWrapperRef.value) return;

      distance.value = textRef.value.offsetWidth + 28;
      duration.value = Math.ceil(distance.value / 35);
   };

   const handleReset = () => {
      if (!isOverflow.value || !textRef.value || !textWrapperRef.value) return;

      duration.value = 0;
      distance.value = 0;
      isOverflow.value = false;

      clearInterval(autoScrollTimerId.value);
      clearTimeout(unScrollTimerId.value);

      textWrapperRef.value.classList.remove("mask");

      unScroll();
   };

   const handleScroll = () => {
      if (!textRef.value || !textWrapperRef.value || !content) return;

      const isOverF = textRef.value.offsetWidth > textWrapperRef.value.offsetWidth;
      if (!isOverF) return;

      isOverflow.value = true;

      textWrapperRef.value.classList.add("mask");

      calc();

      textRef.value.innerHTML =
         textRef.value.innerText + "&nbsp; &nbsp; &nbsp;" + textRef.value.innerText;

      setTimeout(scroll, 1000);

      autoScrollTimerId.value = setInterval(scroll, duration.value * 1000 + 3000);
   };

   watch(
      [content],
      () => {
         console.log("handle scroll");

         handleScroll();

         onWatcherCleanup(handleReset);
      },
      { immediate: true, flush: "post" }
   );

   return {
      textRef,
      textWrapperRef,
   };
}
