<script setup lang="ts">
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/vue/24/outline";
import useVolume from "~/composables/useVolumeButton";
import Button from "~/share/components/Button.vue";

const {
   handleMute,
   handleSetVolume,
   handleWheel,
   volumeHolderRef,
   volumeLineRef,
   isMute,
} = useVolume();

const classes = {
   wrapper: `volume-btn-wrapper group relative
      before:content-[''] before:w-[100%] before:h-1 before:absolute before:bottom-[100%] `,
   volumeLineContainer:
      "absolute hidden sm:flex opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 hover:opacity-100 hover:pointer-events-auto transition-opacity  bottom-[calc(100%+4px)] rounded-lg w-[100%] h-[100px] bg-amber-800 justify-center py-3",
   volumeLine:
      "w-1 cursor-pointer relative bg-amber-100 h-full rounded-full before:content-[''] before:w-4 before:h-full before:absolute before:-translate-x-1/2 before:left-1/2",
   volumeHolder:
      "absolute pointer-events-none hidden sm:block h-3 w-5 rounded-sm bg-amber-900 border-[2px] border-amber-200 left-1/2 -translate-x-1/2 translate-y-1/2",
};
</script>

<template>
   <div @wheel="handleWheel" :class="classes.wrapper">
      <div :class="classes.volumeLineContainer">
         <div @click="handleSetVolume" ref="volumeLineRef" :class="classes.volumeLine">
            <div ref="volumeHolderRef" :class="classes.volumeHolder"></div>
         </div>
      </div>
      <Button class="px-2 h-full" size="clear" colors="second" :onClick="handleMute">
         <SpeakerXMarkIcon v-if="isMute" class="w-6 pointer-events-none" />
         <SpeakerWaveIcon v-else class="w-6 pointer-events-none" />
      </Button>
   </div>
</template>
