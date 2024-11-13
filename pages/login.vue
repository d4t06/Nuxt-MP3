<script setup>
import Button from "~/share/components/Button.vue";

definePageMeta({
   layout: "auth",
});

const { signIn } = useAuth();

const handleLogin = () => {
   signIn({ username: "ad", password: "asd" });
};
</script>

<template>
   <div class="w-[400px] max-w-[90vw]">
      <form
         class="p-4 flex flex-col bg-amber-800 text-amber-100 rounded-[16px] border-[4px] border-amber-900 border-b-[8px]"
         @submit.prevent="handleLogin"
      >
         <input
            type="text"
            placeholder="password"
            class="bg-[rgba(0,0,0,.15)] rounded-md p-2 outline-none text-lg"
         />

         <Button class-name="mt-3 py-2 text-lg">Sign in</Button>

         <p class="text-sm mt-2 text-right">No have account jet?, get out!</p>
      </form>
   </div>
</template>
