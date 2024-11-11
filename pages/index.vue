<script setup lang="ts">
import Button from "../share/components/Button.vue";


const handleButtonOnClick = () => {
   console.log("slfadsljf")
}
</script>

<template>
   <p>This is home page</p>

   <Head>
      <Title>Nuxt MP3</Title>
   </Head>

   <Button :on-click="handleButtonOnClick"> button </Button>
</template>
