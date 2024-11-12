<script lang="ts" setup>
import useScrollText from "~/composables/useScrollText";

type Props = {
   content: string;
   className?: string;
};

const props = defineProps<Props>();

const { textRef, textWrapperRef } = useScrollText({
   content: toRef(() => props.content),
});
</script>

<template>
   <div ref="textWrapperRef" class="relative overflow-hidden h-full">
      <div
         ref="textRef"
         :class="`${props.className} absolute top-0 min-w-full whitespace-nowrap`"
      >
         {{ props.content }}
      </div>
   </div>
</template>
