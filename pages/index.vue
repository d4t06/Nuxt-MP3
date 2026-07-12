<script setup lang="ts">
import Player from "~/components/Player.vue";
import { useAPI } from "~/composables/useAPI";
import { getLocalStorage, setLocalStorage } from "~/share/libs/localStorage";

import { usePlayerStore } from "~/stores/player";

const store = usePlayerStore();
const { audioEle } = storeToRefs(store);

const cacheDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
const STORAGE_KEY = 'songs'

const { data } = await useAPI<{ data: Song[] }>("/songs", {
   getCachedData: (_, __) => {
      if (import.meta.server) return;

      const cached = getLocalStorage()[STORAGE_KEY]
      if (!cached) return;

      try {
         const { fetched_at, value } = JSON.parse(cached) as {
            fetched_at: number;
            value: Song[];
         };

         // Check if the cache is still valid
         if (Date.now() - fetched_at < cacheDuration) {
            console.log("use cached");
            return { data: value };
         }
      } catch (e) {
         // Handle potential JSON parsing errors safely
         localStorage.removeItem(STORAGE_KEY);
      }
   },
   onResponse: (res) => {
      const _data = res.response._data as { data: Song[] };
      if (import.meta.client && _data.data) {
         const cacheData = {
            fetched_at: Date.now(),
            value: _data.data,
         };
         setLocalStorage(STORAGE_KEY, JSON.stringify(cacheData));
      }
   },
});

if (data.value?.data.length) {
   store.songs = data.value.data;
}
</script>

<template>
   <audio ref="audioEle" :src="store.currentSong?.song_url" class="hidden"></audio>
   <Player v-if="audioEle" />
</template>
