<script lang="ts" setup>
import { formatTime } from "~/share/libs/formatTime";
import SongList from "./SongList.vue";
import Button from "~/share/components/Button.vue";
import {
   ArrowPathIcon,
   BackwardIcon,
   ForwardIcon,
   PauseIcon,
   PlayIcon,
   QueueListIcon,
} from "@heroicons/vue/24/outline";
import usePlayer from "~/composables/usePlayer";
import { chekcDisable } from "~/share/libs/appHelper";
import SongInfoAndLyric from "./SongInfoAndLyric.vue";

const store = usePlayerStore();
const { currentSong, songs, audioEle, tab } = storeToRefs(store);

const {
   status,
   handlePlayPause,
   handleNext,
   handlePrevious,
   handleSeek,
   currentTimeTextRef,
   processLineHolderRef,
   processLineRef,
} = usePlayer({ audioEle: audioEle.value! });

const toggleTab = () => {
   tab.value === "playing" ? (store.tab = "queue") : (store.tab = "playing");
};

const handleShowHide = (active: boolean) => {
   if (active) return "opacity-100 h-auto";
   else return "opacity-0 pointer-events-none h-0";
};

const classes = {
   timeLineRef: `relative group h-full sm:h-1 hover:h-full  w-full rounded-full bg-[#fff]/30 before:content-[''] before:w-[100%] before:h-[16px] before:absolute before:top-[50%] before:translate-y-[-50%]`,
   timeLineHolderRef:
      "absolute pointer-events-none h-6 w-3 rounded-sm bg-amber-900 border-[2px] border-amber-200 top-1/2 -translate-y-1/2 -translate-x-1/2",
   toggleButton: "queue-btn px-2",
};
</script>

<template>
   <div class="w-[400px] max-w-[75vw]">
      <div
         class="p-3 bg-amber-800 text-amber-100 rounded-[16px] border-[4px] border-amber-900 border-b-[8px]"
      >
         <div :class="handleShowHide(tab === 'playing' || tab === 'lyric')">
            <SongInfoAndLyric />

            <div
               :class="`${
                  !currentSong ? 'disabled' : ''
               } h-[6px] mt-5 mb-2 flex items-center`"
            >
               <div @click="handleSeek" ref="processLineRef" :class="classes.timeLineRef">
                  <div
                     ref="processLineHolderRef"
                     :class="classes.timeLineHolderRef"
                  ></div>
               </div>
            </div>

            <div class="flex justify-between items-center h-[30px]">
               <div ref="currentTimeTextRef">0:00</div>
               <div>{{ formatTime(currentSong?.duration || 0) }}</div>
            </div>

            <div
               :class="`flex my-2 justify-center items-center space-x-3 ${chekcDisable(
                  !songs.length
               )}`"
            >
               <Button :onClick="handlePrevious">
                  <BackwardIcon class="w-8" />
               </Button>

               <Button :onClick="handlePlayPause">
                  <PauseIcon v-if="status === 'playing'" class="w-10" />
                  <PlayIcon v-else-if="status === 'paused'" class="w-10" />
                  <ArrowPathIcon
                     v-else-if="status === 'waiting'"
                     class="w-10 animate-spin"
                  />
               </Button>

               <Button :onClick="handleNext">
                  <ForwardIcon class="w-8" />
               </Button>
            </div>
         </div>

         <div :class="handleShowHide(tab === 'queue')">
            <SongList />
         </div>
      </div>
   </div>

   <div class="absolute h-10 bottom-8 right-8 flex space-x-2">
      <Button
         :onClick="toggleTab"
         size="clear"
         colors="second"
         :class="classes.toggleButton"
      >
         <QueueListIcon class="w-6" />
      </Button>

      <VolumeButton v-if="audioEle" :audioEle="audioEle" />
      <TimerButton :is-playing="status === 'playing'" />
   </div>
</template>
