<template>
  <div class="index-page">
    <HeroSection />
    <AboutSection class="py-6 lg:py-24" />
    <HowWeWorkSection class="py-6 lg:py-24" />
    <CalendarCoursesSection
      class="py-6 lg:py-24 bg-[#F9FAFB] dark:bg-transparent"
    />
  </div>
</template>

<script setup>
definePageMeta({
  title: "HomePage",
});
</script>
