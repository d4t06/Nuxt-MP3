export default function useModal() {
   const isOpen = ref(false);
   const isMounted = ref(false);

   const open = () => {
      isOpen.value = true;
   };

   const close = () => {
      isMounted.value = false;
   };

   watchEffect(() => {
      if (!isMounted.value) {
         setTimeout(() => {
            isOpen.value = false;
         }, 200);
      }
   });

   watchEffect(() => {
      if (isOpen.value) {
         setTimeout(() => {
            isMounted.value = true;
         }, 0);
      }
   });

   return {
      isOpen,
      isMounted,
      close,
      open,
   };
}
