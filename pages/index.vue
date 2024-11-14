<script setup lang="ts">
import Player from "~/components/Player.vue";
import { API_ENDPOINT } from "~/share/libs/appHelper";

import { usePlayerStore } from "~/stores/player";

const store = usePlayerStore();
const { audioEle } = storeToRefs(store);


const { data } = await useFetch<{ data: { songs: Song[] } }>(
   `${API_ENDPOINT}/songs`
);

if (data.value?.data.songs) {
   store.songs = data.value?.data.songs;
}
</script>

<template>
   <audio ref="audioEle" :src="store.currentSong?.song_url" class="hidden"></audio>
   <Player v-if="audioEle" />
</template>
