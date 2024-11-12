import { onWatcherCleanup } from "vue";

function useDebounce<T>(value: Ref<T>, delay: number, clear: T) {
   const debounceValue = ref<T>();

   watch([value], () => {
      if (!value.value) {
         debounceValue.value = clear;
         return;
      }

      const timeId = setTimeout(() => {
         debounceValue.value = value.value;
      }, delay);

      onWatcherCleanup(() => {
         clearTimeout(timeId);
      });
   });

   return debounceValue;
}

export default useDebounce;
