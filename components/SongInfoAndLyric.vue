<script lang="ts" setup>
import ScrollText from './ScrollText.vue';

const store = usePlayerStore();
const tab = ref<Tab>("playing");

const handleShowHide = (active: boolean) => {
   if (active) return "opacity-100 h-auto";
   else return "opacity-0 pointer-events-none h-0";
};
</script>

<template>
   <div
      class="mt-2"
      @click="() => (tab === 'playing' ? (tab = 'lyric') : (tab = 'playing'))"
   >
      <div
         :class="`${handleShowHide(
            tab === 'playing'
         )} relative cursor-pointer text-center text-amber-100 `"
      >
         <p class="flex">
            <span
               class="ml-auto text-[6px] py-[2px] text-amber-800 px-1 rounded-full bg-amber-100"
            >
               &#9679; &#9679; &#9679;
            </span>
         </p>
         <div class="h-[32px]">
            <ScrollText
               :content="store.currentSong?.name || '...'"
               class="font-bold text-2xl"
            />
         </div>

         <p class="text-sm font-medium line-clamp-1">
            {{ store.currentSong?.singer || "..." }}
         </p>
      </div>

      <div
         :class="`${handleShowHide(
            tab === 'lyric'
         )}  overflow-auto text-center relative text-amber-100 font-[800] text-2xl no-scrollbar mask-vertical`"
      >
         <SongLyricWrapper />

         <p v-if="tab === 'lyric'" class="text-sm mt-2 text-amber-100/60 text-center">
            {{ store.currentSong?.name || "..." }} -
            {{ store.currentSong?.singer || "..." }}
         </p>
      </div>
   </div>
</template>
