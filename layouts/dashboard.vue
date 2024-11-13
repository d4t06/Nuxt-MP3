<script lang="ts" setup>
import type ToastPortal from "~/components/ToastPortal.vue";
</script>

<template>
   <div class="bg-[#fdf6e3] text-amber-800">
      <slot />
   </div>
   <ToastPortal />

   <div id="portal"></div>
</template>
