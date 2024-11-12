<script setup lang="ts">
import Player from "~/components/Player.vue";

import { usePlayerStore } from "~/stores/player";

const store = usePlayerStore();
const { audioEle } = storeToRefs(store);

const runtimeConfig = useRuntimeConfig();

const { data } = await useFetch<{ data: { songs: Song[] } }>(
   `${runtimeConfig.public.apiBase}/songs`
);

if (data.value?.data.songs) {
   store.songs = data.value?.data.songs;
}
</script>

<template>
   <audio ref="audioEle" :src="store.currentSong?.song_url" class="hidden"></audio>
   <Player v-if="audioEle" />
</template>
