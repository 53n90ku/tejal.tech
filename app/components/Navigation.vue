<script setup lang="ts">
const route = useRoute();

const logoText = computed(() => {
  if (route.path.startsWith('/blog/')) {
    return '53n90ku';
  }
  return 'tejal reddy';
});
</script>

<template>
  <nav class="mb-8">
    <NuxtLink
      class="text-3xl lowercase text-black-primary dark:text-white-primary"
      to="/"
      >{{ logoText }}</NuxtLink
    >
  </nav>
</template>
