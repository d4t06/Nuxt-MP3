<script lang="ts" setup>
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { cva, type VariantProps } from "class-variance-authority";

const classes = {
   active: "before:shadow-none font-[500] translate-y-[2px] text-[#cd1818]",
   button: "inline-flex relative items-center justify-center z-0 hover:brightness-90",
};

const ButtonVariant = cva(classes.button, {
   variants: {
      variant: {
         primary:
            "before:content-[''] before:border-[2px] before:absolute before:z-[-1] before:inset-0 before:rounded-[8px] rounded-[8px]  active:translate-y-[2px] active:before:shadow-none",
         clear: "",
      },
      size: {
         primary: "px-3 py-1",
         clear: "",
      },

      colors: {
         primary:
            "text-amber-100 before:bg-amber-800 before:border-[#78350f] before:shadow-[0_2px_0_#78350f]",
         second:
            "text-amber-800 before:bg-amber-100 before:border-[#78350f] before:shadow-[0_2px_0_#78350f]",
         clear: "",
      },
   },

   defaultVariants: {
      variant: "primary",
      size: "primary",
      colors: "primary",
   },
});

type TypeProps = VariantProps<typeof ButtonVariant>;

type ButtonProps = {
   onClick?: () => void;
   href?: string;
   active?: boolean;
   loading?: boolean;
   disabled?: boolean;
   className?: string;
   variant?: TypeProps["variant"];
   colors?: TypeProps["colors"];
   size?: TypeProps["size"];
};

const props = defineProps<ButtonProps>();
const {
   href,
   variant,
   colors,
   size,
   className,
   disabled = false,
   loading = false,
   onClick,
   active,
} = toRefs(props);
</script>

<template>
   <NuxtLink
      v-if="href"
      :to="href"
      :class="ButtonVariant({ variant, size, colors, className })"
   >
      <slot />
   </NuxtLink>

   <template v-else>
      <button
         :disabled="loading || disabled"
         @click="onClick"
         :class="`${ButtonVariant({
            variant,
            size,
            colors,
            className,
         })} ${active ? classes.active + ' ' + active : ''}`"
      >
         <template v-if="loading">
            <ArrowPathIcon class="w-6 animate-spin" />
         </template>
         <template v-else>
            <slot />
         </template>
      </button>
   </template>
</template>
