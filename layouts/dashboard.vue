<script lang="ts" setup>
import { HomeIcon } from '@heroicons/vue/24/outline';
import Button from '~/share/components/Button.vue';
import bgImage from '../public/bg-image.png'
</script>

<template>
   <div :style="{backgroundImage: `url(${bgImage})`}" class="bg-[#fdf6e3] text-amber-800 min-h-screen">
      <slot />
   </div>

   <Button href="/" size="clear" class-name="!fixed bottom-8 left-8 p-2">
      <HomeIcon class="w-6" />
   </Button>
   <ToastPortal />

   <div id="portal"></div>
</template>
