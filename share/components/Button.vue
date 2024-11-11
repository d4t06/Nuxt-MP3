<script setup lang="ts">
type Props = {
   onClick?: () => void;
};

const props = defineProps<Props>();
</script>

<template>
   <button @click="props.onClick">
      <slot />
   </button>
</template>
