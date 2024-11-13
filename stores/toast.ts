export const useToastStore = defineStore("player", () => {
   const toasts = ref<Toast[]>([]);

   const setErrorToast = (message: string = "Somethings went wrong") =>
      toasts.value.push({ variant: "error", id: Date.now() + "", desc: message });

   const setSuccessToast = (message: string = "Somethings went successful") =>
      toasts.value.push({ variant: "success", id: Date.now() + "", desc: `${message}` });

   return { toasts, setErrorToast, setSuccessToast };
});
