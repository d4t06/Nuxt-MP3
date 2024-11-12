<script lang="ts" setup>
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import useGetSongLyric from "~/composables/useGetSongLyric";
import SongLyric from "./SongLyric.vue";

const { isFetching, lyrics } = useGetSongLyric();
</script>

<template>
   <span v-if="isFetching">
      <ArrowPathIcon class="w-6 animate-spin" />
   </span>

   <SongLyric v-else :lyrics="lyrics" />
</template>
