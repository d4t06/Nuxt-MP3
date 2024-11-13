<script lang="ts" setup>
import {
   DocumentTextIcon,
   PauseIcon,
   PencilIcon,
   PlayIcon,
   TrashIcon,
} from "@heroicons/vue/24/outline";
import Button from "~/share/components/Button.vue";
import ConfirmModal from "~/share/components/ConfirmModal.vue";
import EditSongModal from "~/share/components/EditSongModal.vue";
import type { ModalRef } from "~/share/components/Modal.vue";
import Modal from "~/share/components/Modal.vue";
import useSongItemAction from "../composables/useSongItemAction";
import { data } from "autoprefixer";

type Props = {
   song: Song;
};

type Modal = "delete" | "edit";

const props = defineProps<Props>();

const isPlaying = ref(false);
const audioRef = ref<HTMLAudioElement>();

const modalRef = ref<ModalRef>();
const modal = ref<Modal>("edit");

const { action, isFetching } = useSongItemAction();

const openModal = (m: Modal) => {
   modal.value = m;
   modalRef.value?.open();
};

const handlePlayPause = (e: MouseEvent) => {
   const newIsPlaying = !isPlaying.value;

   isPlaying.value = newIsPlaying;

   if (newIsPlaying) {
      const previewPlayingBtn = document.querySelector(
         "button.current-playing"
      ) as HTMLButtonElement;
      if (previewPlayingBtn) previewPlayingBtn.click();

      audioRef.value?.play();
   } else {
      audioRef.value?.pause();
   }

   (e.target as HTMLButtonElement).classList.toggle("current-playing", newIsPlaying);
};

const classes = {
   button: "space-x-1 px-2 py-1",
   text: "hidden sm:block",
};
</script>

<template>
   <div class="space-x-2 flex-shrink-0 text-right">
      <audio ref="audioRef" :src="props.song.song_url" class="hidden"></audio>
      <Button
         colors="second"
         :on-click="handlePlayPause"
         :class="classes.button"
         size="clear"
      >
         <PauseIcon v-if="isPlaying" class="w-6 pointer-events-none" />
         <PlayIcon v-else class="w-6 pointer-events-none" />
      </Button>

      <Button
         colors="second"
         :on-click="() => openModal('delete')"
         :class="classes.button"
         size="clear"
      >
         <TrashIcon class="w-6" />
         <span class="{classes.text}">Delete</span>
      </Button>

      <Button
         colors="second"
         :on-click="() => openModal('edit')"
         :class="classes.button"
         size="clear"
      >
         <PencilIcon class="w-6" />
         <span class="{classes.text}">Edit</span>
      </Button>

      <Button colors="second" :class="classes.button" size="clear">
         <DocumentTextIcon class="w-6" />
         <span class="{classes.text}">Lyric</span>
      </Button>
   </div>

   <Modal ref="modalRef">
      <ConfirmModal
         :close-modal="() => modalRef?.close()"
         :callback="() => {}"
         :loading="false"
         v-if="modal === 'delete'"
      />

      <EditSongModal
         v-if="modal === 'edit'"
         :loading="false"
         :song="props.song"
         :close-modal="() => modalRef?.close()"
         :submit="(data) => action({ variant: 'edit', id: props.song.id, song: data })"
      />
   </Modal>
</template>
