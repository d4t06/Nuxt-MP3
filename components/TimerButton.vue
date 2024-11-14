<script setup lang="ts">
import { ClockIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import useTimer from "~/composables/useTimer";
import Button from "~/share/components/Button.vue";
import Modal, { type ModalRef } from "~/share/components/Modal.vue";

type Props = {
   isPlaying: boolean;
};

const COUNT_LIST = [3, 5, 7, 10];

const props = defineProps<Props>();

const modalRef = ref<typeof Modal & ModalRef>();

const { isActive, countDown, clearTimer, currentIndex } = useTimer({ isPlaying: props.isPlaying });

const handleButtonClick = () => {
   if (!isActive.value) return modalRef.value?.open();
   else clearTimer();
};

const handleSetTimer = (songCount: number) => {
   isActive.value = songCount;
   modalRef.value?.close();
};

const classes = {
   timerButton: `ml-2 mt-2 px-3  py-1 rounded-[99px]`,
};
</script>

<template>
   <Button
      :on-click="handleButtonClick"
      :disabled="currentIndex === null"
      size="clear"
      colors="second"
      class="group h-full w-10"
   >
      <template v-if="isActive">
         <span class="leading-[1] group-hover:hidden">{{
            countDown.toString().padStart(2, "0")
         }}</span>
         <XMarkIcon class="w-6 hidden group-hover:block" />
      </template>
      <ClockIcon v-else class="w-6" />
   </Button>

   <Modal ref="modalRef">
      <div
         class="w-[300px] max-w-[calc(100vw-40px)] text-amber-800 rounded-lg"
      >
         <h1 class="text-xl mb-3">Sleep timer</h1>
         <div>
            <div class="flex flex-wrap -mt-2 -ml-2 mb-3">
               <Button
                  v-for="item in COUNT_LIST"
                  :on-click="() => handleSetTimer(item)"
                  :class="classes.timerButton"
                  colors="second"
               >
                  {{ item }} songs
               </Button>
            </div>
         </div>
      </div>
   </Modal>
</template>
