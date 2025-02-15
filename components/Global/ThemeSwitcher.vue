<template>
  <div class="theme-switcher">
    <ClientOnly>
      <button
        aria-label="Theme"
        @click="isDark = !isDark"
        class="cool-button rounded-full flex items-center justify-center capitalize gap-[2px]"
      >
        <Icon size="18" v-if="isDark" name="i-heroicons-moon-20-solid" />
        <Icon size="18" v-else name="i-heroicons-sun-20-solid" />
      </button>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<style lang="postcss" scoped></style>
