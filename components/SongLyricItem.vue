<script setup lang="ts">
type Props = {
   currentLyricIndex: number;
   index: number;
   text: string;
};

const props = defineProps<Props>();

const status = computed(() => {
   let status: LyricStatus = "coming";

   if (props.index < props.currentLyricIndex) status = "done";
   if (props.index === props.currentLyricIndex) status = "active";

   return status;
});

const getClass = () => {
   switch (status.value) {
      case "coming":
         return "";
      case "active":
         return "text-[#ffed00] active-lyric";
      case "done":
         return "disabled";
   }
};
</script>

<template>
   <p ref="{ref}" :class="`select-none ${getClass()}`">
      {{ props.text }}
   </p>
</template>
