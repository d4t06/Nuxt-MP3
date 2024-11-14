<script lang="ts" setup>
import ScrollText from "./ScrollText.vue";

const store = usePlayerStore();
const { tab } = storeToRefs(store);

const handleShowHide = (active: boolean) => {
   if (active) return "opacity-100";
   else return "opacity-0 pointer-events-none !h-0";
};
</script>

<template>
   <div
      class="mt-2"
      @click="() => (tab === 'playing' ? (store.tab = 'lyric') : (store.tab = 'playing'))"
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

         <p class="line-clamp-1 text-sm">
            {{ store.currentSong?.singer || "..." }}
         </p>
      </div>

      <div
         :class="`lyric-container h-[30vh] ${handleShowHide(
            tab === 'lyric'
         )}  overflow-auto text-center relative [&>*]:mt-4 [&>*:last-child]:mb-[15vh] text-amber-100 font-[700] text-2xl no-scrollbar mask-vertical`"
      >
         <SongLyricWrapper />
      </div>
      <p v-if="tab === 'lyric'" class="text-sm mt-2 text-amber-100/60 text-center whitespace-nowrap text-ellipsis overflow-hidden">
         {{ store.currentSong?.name || "..." }} -
         {{ store.currentSong?.singer || "..." }}
      </p>
   </div>
</template>
