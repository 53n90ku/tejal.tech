<script setup lang="ts">
const baseTitle = '53n90ku';
const baseDescription =
  'Software developer. Lover of all things programming - always learning new stuff.';
const baseOgImage = '/og-image.png';
const ogType = 'website';
const author = 'Tejal';
const ogSiteName = 'Tejal';
const twitterCard = 'summary_large_image';

function titleTemplate(title?: string) {
  if (title?.length && title !== baseTitle) {
    return `${title} | Tejal`;
  }
  return baseTitle;
}

useHead({
  title: baseTitle,
  titleTemplate,
});

useServerHead({
  title: baseTitle,
  titleTemplate,
});

useSeoMeta({
  author,
  description: baseDescription,
  ogDescription: baseDescription,
  ogImage: baseOgImage,
  ogSiteName,
  ogTitle: baseTitle,
  ogType,
  title: baseTitle,
  titleTemplate,
  twitterCard,
});

useServerSeoMeta({
  author,
  description: baseDescription,
  ogDescription: baseDescription,
  ogImage: baseOgImage,
  ogSiteName,
  ogTitle: baseTitle,
  ogType,
  title: baseTitle,
  titleTemplate,
  twitterCard,
});
</script>

<template>
  <div class="container mx-auto flex h-full min-h-screen flex-col px-8 py-4">
    <Navigation />

    <NuxtPage />
  </div>
</template>
