<script lang="ts" setup>
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import useGetSongLyric from "~/composables/useGetSongLyric";
import SongLyric from "./SongLyric.vue";
import Center from "~/share/components/Center.vue";

const { isFetching, lyrics } = useGetSongLyric();
</script>

<template>
   <Center v-if="isFetching">
      <ArrowPathIcon class="w-7 animate-spin" />
   </Center>

   <SongLyric v-else :lyrics="lyrics" />
</template>
