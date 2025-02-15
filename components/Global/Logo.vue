<template>
  <NuxtLink
    class="shrink-0 block"
    :to="localePath('/')"
    aria-label="go-to-home-page"
  >
    <NuxtImg :src="logoSrc" alt="site Logo" v-bind="$attrs" format="webp" />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  logoBig: {
    type: Boolean,
    default: false,
  },
});

const localePath = useLocalePath();
defineOptions({
  inheritAttrs: false,
});

const logoSrc = computed(() => {
  return props.logoBig ? "/images/logo/logo-big.png" : "/images/logo/logo.png";
});
</script>
