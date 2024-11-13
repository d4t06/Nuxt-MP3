<script lang="ts" setup>
import useSongLyric from "~/composables/useSongLyric";
import SongLyricItem from "./SongLyricItem.vue";
import Center from "~/share/components/Center.vue";

type Props = {
   lyrics: Lyric[];
};

const props = defineProps<Props>();

const { currentLyricIndex } = useSongLyric({
   lyrics: toRef(() => props.lyrics),
});
</script>

<template>
   <SongLyricItem
      v-if="lyrics.length"
      v-for="(l, i) in lyrics"
      :text="l.text"
      :index="i"
      :currentLyricIndex="currentLyricIndex"
   />

   <Center v-else>
      <p>...</p>
   </Center>
</template>
