<script setup>
import Button from "~/share/components/Button.vue";

definePageMeta({
   layout: "auth",
});

const { signIn } = useAuth();

const password = ref("");
const isFetching = ref(false);

const handleLogin = async () => {
   try {
      isFetching.value = true;

      await signIn({ password: password.value }, { callbackUrl: "/dashboard" });
   } catch (error) {
   } finally {
      isFetching.value = false;
   }
};
</script>

<template>
   <div class="w-[400px] max-w-[90vw]">
      <form
         class="p-4 flex flex-col bg-amber-800 text-amber-100 rounded-[16px] border-[4px] border-amber-900 border-b-[8px]"
         @submit.prevent="handleLogin"
      >
         <input
            v-model="password"
            type="text"
            placeholder="******"
            class="bg-[rgba(0,0,0,.15)] rounded-md p-2 outline-none text-amber-100 text-lg placeholder:text-[#808080]"
         />

         <Button :loading="isFetching" class-name="mt-3 py-2 text-lg">Sign in</Button>

         <p class="text-sm mt-2 text-right">No have account jet?, get out!</p>
      </form>
   </div>
</template>
