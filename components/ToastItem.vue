<script setup lang="ts">
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
type Props = {
   toast: Toast;
};

const props = defineProps<Props>();

const isOpen = ref(false);

watchEffect(() => {
   setTimeout(() => (isOpen.value = true), 0);
});

const classes = {
   unMountedContent: "opacity-0 translate-x-[40px]",
   mountedContent: "opacity-100 translate-x-0",
   container:
      "flex items-center py-1 transition-[opacity,transform] px-2 space-x-1 rounded-md bg-amber-800 text-amber-100",
};
</script>

<template>
   <div
      :class="`${classes.container} ${
         isOpen ? classes.mountedContent : classes.unMountedContent
      }`"
   >
      <CheckIcon v-if="props.toast.variant === 'success'" class="w-6" />
      <XMarkIcon v-if="props.toast.variant === 'error'" class="w-6" />
      <p>{{ props.toast.desc }}</p>
   </div>
</template>
