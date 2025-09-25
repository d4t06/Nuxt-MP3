<script setup lang="ts">
import Player from "~/components/Player.vue";

import { usePlayerStore } from "~/stores/player";

const store = usePlayerStore();
const { audioEle } = storeToRefs(store);

const { data } = await useFetch<Song[]>(`/api/song`, { key: "songs" });

if (data.value?.length) {
   store.songs = data.value;
}

// const getSongs = useGetSongs();

// watchEffect(() => {
//    getSongs();
// });
</script>

<template>
   <audio ref="audioEle" :src="store.currentSong?.song_url" class="hidden"></audio>
   <Player v-if="audioEle" />
</template>
