<script setup lang="ts">
import useSongListEvent from "~/composables/useSongList";
import SongListItem from "./SongListItem.vue";

type Props = {
   back: () => void;
   tab: Tab;
};

const props = defineProps<Props>();
const store = usePlayerStore();

const { songListRef } = useSongListEvent({ back: props.back, tab: toRef(() => props.tab) });
</script>

<template>
   <div ref="songListRef" class="max-h-[40vh] overflow-auto no-scrollbar">
      <template v-if="store.songs.length">
         <SongListItem
            v-for="(s, i) in store.songs"
            :active="i === store.currentIndex"
            :index="i"
            :song="s"
            :setCurrentSong="() => (store.currentIndex = i)"
         />
      </template>
      <p v-else>No song jet...</p>
   </div>
</template>
