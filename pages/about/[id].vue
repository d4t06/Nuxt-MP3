<script setup>
const { id } = useRoute().params;
</script>

<template>

   <Head>
      <Title>About - {{ id }}</Title>
   </Head>

   <p>This is about pge {{ id }}</p>
</template>
