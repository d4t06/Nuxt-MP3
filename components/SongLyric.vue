<script lang="ts" setup>
import useSongLyric from "~/composables/useSongLyric";
import SongLyricItem from "./SongLyricItem.vue";

type Props = {
   lyrics: Lyric[];
};

const props = defineProps<Props>();

const { lyricRefs, currentLyricIndex } = useSongLyric({ lyrics: props.lyrics });
</script>

<template>
   <SongLyricItem
      v-for="(l, i) in lyrics"
      className="pb-4"
      ref="lyricRefs"
      :text="l.text"
      :index="i"
      :currentLyricIndex="currentLyricIndex"
   />
</template>
