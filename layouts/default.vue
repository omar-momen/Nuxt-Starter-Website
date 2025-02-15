<template>
  <div class="default-layout">
    <TheNavbar />
    <div class="pages-container">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import TheFooter from "~/components/Structure/TheFooter.vue";

const route = useRoute();
</script>

<style lang="postcss" scoped>
.pages-container {
  padding-top: calc(var(--navbar-height) + 2rem);
}
</style>
