<script setup>
import { HomeIcon } from "@heroicons/vue/24/outline";
import Button from "~/share/components/Button.vue";
</script>

<template>
   <div
      class="fixed flex justify-center items-center inset-alternate bg-[#fdf6e3] text-amber-800"
   >
      <slot />
   </div>

   <Button size="clear" class-name="!absolute left-8 bottom-8 p-2">
      <HomeIcon class="w-6" />
   </Button>
</template>
