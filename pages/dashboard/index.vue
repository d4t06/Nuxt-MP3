<script setup lang="ts">
import { ArrowUpTrayIcon } from "@heroicons/vue/24/outline";
import Button from "~/share/components/Button.vue";
import Center from "~/share/components/Center.vue";
import getAllSongs from "~/share/services/getAllSongs";
import DashboardSongItem from "./_components/DashboardSongItem.vue";

definePageMeta({
   layout: "dashboard",
   middleware: "auth",
});

const songs = await getAllSongs();
</script>

<template>
   <Center v-if="!songs">Something went wrong...</Center>

   <div v-else class="fixed top-0 z-[9] w-full bg-[#fdf6e3]">
      <div class="container md:max-w-[800px] mt-5">
         <div class="flex justify-between items-center">
            <div class="text-xl text-amber-900 font-semibold">Songs</div>
            <Button
               type="button"
               class-name="button inline-flex relative items-center justify-center z-0 variant--primary text-amber-100 before:bg-amber-800 before:border-[2px] font-[500]"
            >
               <label class="flex space-x-1 px-3 py-1" for="song-upload">
                  <ArrowUpTrayIcon class="w-6" />
                  <span class="hidden sm:block">Upload</span>
               </label>
            </Button>
         </div>
         <div class="border-amber-800/15 border-b-[1px] pb-1">
            {{ songs.length }} songs
         </div>
      </div>
   </div>

   <div class="container md:max-w-[800px] pt-[90px]">
      <DashboardSongItem v-for="s in songs" :song="s" />
   </div>
</template>
