<script setup lang="ts">
import { switchHighlightColor } from '~/colors';

const hiddenLanguages = [
  'json',
  'json5',
  'jsonc',
  'markdown',
  'netrw',
  'other',
  'toml',
  'yaml',
  'yml',
];

const defaultLanguages = ['C++', 'Python','Go','Julia', 'TypeScript'];

function formatLanguageText(inputLanguages?: string[]) {
  const l =
    inputLanguages &&
    typeof inputLanguages === 'object' &&
    Array.isArray(inputLanguages) &&
    inputLanguages?.length
      ? inputLanguages
      : defaultLanguages;

  const maxLanguages = Math.min(l?.length ?? 0, 4);

  const pickedLanguages: string[] = [];

  for (
    let i = 0;
    pickedLanguages.length < maxLanguages && i < l.length;
    i += 1
  ) {
    const language = l[i];

    if (typeof language !== 'string') {
      continue;
    }

    if (hiddenLanguages.includes(language.toLowerCase())) {
      continue;
    }

    pickedLanguages.push(language);
  }

  let formatted = '';

  for (let i = 0; i < pickedLanguages.length; i += 1) {
    const language = pickedLanguages[i];

    if (i === 0) {
      formatted += language;
    } else if (i === pickedLanguages.length - 1) {
      if (formatted.length) {
        formatted += ' and ';
      }
      formatted += language;
    } else {
      if (formatted.length) {
        formatted += ', ';
      }
      formatted += l[i];
    }
  }

  if (!formatted?.length) {
    formatted = 'Rust, TypeScript and Python';
  }

  return `Lately I have been writing a lot of ${formatted}.`;
}

const rotation = ref(0);

const favicon = computed(() => {
  if (!rotation.value) {
    return [];
  }

  const v = rotation.value % 360;

  const href = `/favicon${v === 0 ? '' : `-${v}`}.svg`;

  return [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href,
    },
  ];
});

useHead({
  link: favicon,
});

const rotateInterval = ref<ReturnType<typeof setInterval>>();

function rotateFavicon() {
  rotation.value += 15;
}

function startRotation() {
  if (rotateInterval.value) {
    return;
  }

  rotateFavicon();

  rotateInterval.value = setInterval(rotateFavicon, 100);
}

function stopRotation() {
  clearInterval(rotateInterval.value);

  rotateInterval.value = undefined;
}

function easterEgg() {
  switchHighlightColor();

  startRotation();
}
</script>

<template>
  <section
    id="about"
    class="grid grid-cols-1 items-center gap-4 lg:grid-cols-2"
  >
    <div class="flex flex-col gap-4">
      <h1
        class="text-5xl font-bold text-black-primary lg:text-6xl dark:text-white-primary"
      >
        <span
          class="text-[color:var(--highlight)] duration-300"
          @focus="easterEgg"
          @focusout="stopRotation"
          @mouseenter="easterEgg"
          @mouseleave="stopRotation"
          >Hi,</span
        >
        I'm Tejal
      </h1>

      <p class="text-xl text-black-primary dark:text-white-primary">
        I am a CS Undergrad at BITS Goa(2024 - present). Codes for fun :)<br />
        <span class="text-green-600 font-medium my-2 inline-block">Open to work</span><br />
        {{
          formatLanguageText(defaultLanguages)
        }}
      </p>

      <p class="text-xl text-black-primary dark:text-white-primary">
        Previously, I interned at 
        <a class="underline font-medium" href="https://beijan.com/" target="_blank">Beijan</a> (May 2026 - July 2026)
        where I worked on GPS denied navigation:
      </p>

      <ul
        class="mb-4 ml-8 list-disc text-xl text-black-primary dark:text-white-primary"
      >
        <li>Shipped a module which estimates the GPS location of the drone using publicly available satellite data.</li>
        <li>Currently in the testing stage.</li>
      </ul>

      <div class="flex gap-4 mt-2">
        <GithubLink />

        <LinkedInLink />
      </div>
    </div>

    <div class="order-first mx-auto w-52 h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-xl lg:order-1 lg:ml-auto lg:mr-0">
      <img
        alt="Profile image"
        class="w-full h-full object-cover"
        src="/me.jpg"
      />
    </div>
  </section>
</template>
