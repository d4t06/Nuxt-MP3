<script lang="ts" setup>
import DashboardSongItemCta from "./DashboardSongItemCta.vue";
type Props = {
   song: Song;
};

const props = defineProps<Props>();
</script>

<template>
   <div
      class="flex justify-between items-center py-2 text-amber-800 border-b border-b-amber-800/15"
   >
      <div class="">
         <h5 class="overflow-ellipsis">{{props.song.name}}</h5>
         <p class="text-sm">{{props.song.singer}}</p>
      </div>
      <DashboardSongItemCta :song="props.song" />
   </div>
</template>
