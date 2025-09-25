<script setup lang="ts">
import { formatTime } from "~/share/libs/formatTime";

type Props = {
   song: Song;
   index: number;
   active: boolean;
   setCurrentSong: () => void;
};

const props = defineProps<Props>();
const handleSetSong = () => {
   if (!props.active) {
      props.setCurrentSong();
   }
};

const classes = {
   container: "flex w-full font-medium justify-between items-center rounded-md p-2",
};

const getActiveClass = () => {
   if (props.active) return "bg-amber-100 text-amber-800";
   return "cursor-pointer text-amber-100 hover:bg-amber-700";
};
</script>

<template>
   <div
      @click="handleSetSong"
      :data-first_letter="props.song.first_letter"
      :class="`${classes.container} ${getActiveClass()}`"
   >
      <div>
         <h5>{{ props.song.name }}</h5>
         <p class="text-sm opacity-80">
            <span v-for="(singer, id) in props.song.singers"
               >{{ id ? ", " : "" }}{{ singer.name }}</span
            >
         </p>
      </div>
      <span class="">{{ formatTime(props.song.duration) }}</span>
   </div>
</template>
