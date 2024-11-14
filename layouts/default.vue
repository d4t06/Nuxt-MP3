<script setup>
import bgImage from '../public/bg-image.png'
</script>

<template>
   <div :style="{backgroundImage: `url(${bgImage})`}" class="fixed flex justify-center items-center inset-alternate bg-[#fdf6e3] text-amber-800">
      <slot />
   </div>

   <div class="fixed text-sm left-8 bottom-2 text-amber-800">
      Make with ❤️ by d4t06
   </div>


   <div id="portal"></div>
</template>
