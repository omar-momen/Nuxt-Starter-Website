<template>
  <ul @click="emit('close')">
    <li v-for="link in links" :key="link.name">
      <NuxtLink :to="localePath(link.path)" aria-label="go-to-home-page">
        {{ $t(`links.${link.name}`) }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

const links = ref([
  { name: "home", path: "/" },
  // { name: "about-us", path: "/about" },
  // { name: "posts", path: "/posts" },
  // { name: "become-partner", path: "/become-partner" },
  // { name: "teams", path: "/teams" },
  // { name: "bog", path: "/bog" },
]);

const localePath = useLocalePath();
</script>

<style lang="postcss" scoped>
li {
  a {
    @apply font-medium text-base capitalize transition-all hover:text-primary;

    &.router-link-exact-active {
      @apply text-primary font-bold;
    }
  }
}
</style>
