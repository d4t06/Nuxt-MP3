<script setup lang="ts">
import Player from "~/components/Player.vue";
import { useAPI } from "~/composables/useAPI";

import { usePlayerStore } from "~/stores/player";

const store = usePlayerStore();
const { audioEle } = storeToRefs(store);
const { data } = await useAPI<{ data: Song[] }>("/songs");

if (data.value?.data.length) {
   store.songs = data.value.data;
}
</script>

<template>
   <audio ref="audioEle" :src="store.currentSong?.song_url" class="hidden"></audio>
   <Player v-if="audioEle" />
</template>
