<script lang="ts" setup>
import Button from "./Button.vue";

type Props = {
   callback: () => void;
   label?: string;
   desc?: string;
   loading: boolean;
   className?: string;
   closeModal: () => void;
};

const props = defineProps<Props>();

const { callback, className, closeModal, desc, label, loading } = toRefs(props);
</script>

<template>
   <div
      :class="`text-amber-800 ${className || 'w-[500px] max-w-[calc(90vw-40px)]'} ${
         loading ? 'opacity-60 pointer-events-none' : ''
      }`"
   >
      <h1 class="text-[20px] font-semibold">
         {{ label || "Wait a minute" }}
      </h1>

      <p v-if="desc" class="text-[16px] font-semibold text-red-500">{desc}</p>

      <div class="flex gap-[10px] mt-[20px]">
         <Button :onClick="closeModal">Close</Button>
         <Button
            colors="second"
            class="min-w-[120px]"
            :loading="loading"
            :on-click="callback"
         >
            Yes please
         </Button>
      </div>
   </div>
</template>
