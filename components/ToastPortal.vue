<script lang="ts" setup>
import { useToastStore } from "~/stores/toast";
import ToastItem from "./ToastItem.vue";

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);

const removing = ref("");

const classes = {
   wrapper: "fixed z-[9999] bottom-[30px] right-[60px]",
   container: "flex space-y-[10px] flex-col",
};

watchEffect(() => {
   if (removing.value) {
      const newToast = toasts.value.filter((t) => t.id !== removing.value);
      toastStore.toasts = newToast;
   }
});

watchEffect(() => {
   if (!toasts.value.length) return;

   const id = toasts.value[toasts.value.length - 1].id;
   setTimeout(() => {
      removing.value = id;
   }, 3000);
});
</script>

<template>
   <div :class="classes.wrapper">
      <div :class="classes.container">
         <ToastItem v-for="t in toastStore.toasts" :toast="t" />
      </div>
   </div>
</template>
