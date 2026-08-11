<script setup lang="ts">
const { data: list } = await useAsyncData('archives-posts', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .order('date_created', 'DESC')
    .all()
);

useHead({
  title: 'Archives',
});
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <section class="flex flex-col gap-4">
      <SectionTitle class="mb-4"> Archives </SectionTitle>
      
      <p class="text-lg text-black-secondary dark:text-white-secondary mb-4">
        A complete collection of all thoughts and blog posts.
      </p>

      <ul class="flex flex-col gap-4">
        <li v-for="link in list" :key="link.path" class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <NuxtLink
            class="transition-300 text-xl underline hover:text-black-secondary dark:hover:text-white-secondary"
            :to="link.path"
          >
            {{ link.title }}
          </NuxtLink>
          <span v-if="link.date_created" class="text-sm text-black-secondary dark:text-white-secondary whitespace-nowrap">
            {{ new Date(link.date_created).toDateString() }}
          </span>
        </li>
      </ul>
    </section>

    <NuxtLink
      class="mt-8 text-left font-medium underline text-black-secondary dark:text-white-secondary hover:text-black-primary dark:hover:text-white-primary"
      to="/"
    >
      &larr; Back home
    </NuxtLink>
  </div>
</template>
