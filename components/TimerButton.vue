<script setup lang="ts">
import { ClockIcon } from "@heroicons/vue/24/outline";
import useTimer from "~/composables/useTimer";
import Button from "~/share/components/Button.vue";
import Modal from "~/share/components/Modal.vue";

type Props = {
   isPlaying: boolean;
};

const props = defineProps<Props>();

const modalRef = ref<typeof Modal>();

const { isActive, countDown, clearTimer } = useTimer({ isPlaying: props.isPlaying });

const handleButtonClick = () => {
   if (!isActive.value) return modalRef.value?.open();
   else clearTimer(true);
};
</script>

<template>
   <Button :on-click="handleButtonClick" size="clear" colors="second" class="h-full px-2">
      <ClockIcon class="w-6" />
   </Button>

   <Modal ref="modalRef">his is modal</Modal>
</template>
