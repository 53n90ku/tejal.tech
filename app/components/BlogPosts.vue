<script setup lang="ts">
const { data: list } = await useAsyncData('blog-posts-featured', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .where('featured', '=', true)
    .order('date_created', 'DESC')
    .all()
);
</script>

<template>
  <section class="flex flex-col gap-4">
    <SectionTitle class="mb-4"> Thoughts </SectionTitle>

    <NuxtLink
      v-for="link in list"
      :key="link.path"
      class="transition-300 text-xl underline"
      :to="link.path"
      >{{ link.title }}</NuxtLink
    >

    <NuxtLink
      class="mt-2 font-medium underline text-black-secondary dark:text-white-secondary hover:text-black-primary dark:hover:text-white-primary"
      to="/archives"
    >
      archives &rarr;
    </NuxtLink>
  </section>
</template>
