<script lang="ts" setup>
import type { Prop } from "vue";
import Button from "./Button.vue";

type Props = {
   song: Song;
   submit: (schema: Partial<Song>) => void;
   loading: boolean;
   closeModal: () => void;
};

const props = defineProps<Props>();

const loading = toRef(() => props.loading);

const songData = ref<Partial<Song>>({
   name: props.song.name,
   singer: props.song.singer,
});

const ableToSubmit = computed(
   () =>
      !!songData.value.name &&
      !!songData.value.singer &&
      (songData.value.name !== props.song.name ||
         songData.value.singer !== props.song.singer)
);
</script>

<template>
   <div
      :class="`w-[600px] max-w-[calc(90vw-40px)]
         ${loading ? 'opacity-60 pointer-events-none' : ''}`"
   >
      <h1 class="text-xl font-medium">Edit {{ props.song.name }}</h1>

      <div class="mt-3 space-y-2">
         <div class="space-y-1">
            <label htmlFor="image"> Name </label>
            <input
               type="text"
               class="w-full bg-amber-800 text-amber-100 py-2 rounded-lg outline-none px-2"
               autoComplete="off"
               required
               v-model="songData.name"
            />
         </div>

         <div class="space-y-1">
            <label htmlFor="image"> Singer </label>
            <input
               type="text"
               class="w-full bg-amber-800 text-amber-100 py-2 rounded-lg outline-none px-2"
               autoComplete="off"
               required
               v-model="songData.singer"
            />
         </div>
      </div>

      <div class="flex space-x-3 mt-5">
         <Button :on-click="closeModal">Close</Button>
         <Button
            colors="second"
            class-name="min-w-[120px]"
            :loading="loading"
            :disabled="!ableToSubmit"
            :on-click="() => (ableToSubmit ? props.submit(songData) : {})"
         >
            Save
         </Button>
      </div>
   </div>
</template>
