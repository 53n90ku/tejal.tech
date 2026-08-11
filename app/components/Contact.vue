<template>
  <section id="contact" class="flex flex-col gap-2">
    <SectionTitle>Wanna get in touch?</SectionTitle>

    <p class="text-xl text-black-primary dark:text-white-primary">
      I am always available for interesting discussions, drop me a mail :)  
    </p>

    <div class="flex gap-4 mt-2">
      <GithubLink />

      <LinkedInLink />

      <a
        aria-label="Send me an email"
        href="mailto:tejalreddygaddam@gmail.com"
      >
        <IconsEmail
          class="aspect-square size-12 rounded-sm bg-white-primary p-2 text-black-primary duration-300 hover:text-[color:var(--highlight)] dark:bg-black-primary dark:text-white-primary"
        />
      </a>
    </div>
  </section>
</template>
