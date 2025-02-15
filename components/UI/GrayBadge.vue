<template>
  <span
    class="inline-flex gap-2 items-center px-3 my-3 py-1 text-md font-medium text-para dark:text-whiteColor bg-whiteColor dark:bg-darkColor rounded-xl border-2 border-para/30"
  >
    <CircleArrowIcon class="dark:fill-whiteColor" /> {{ text }}
  </span>
</template>

<script setup>
defineProps({
  text: String,
});
</script>
