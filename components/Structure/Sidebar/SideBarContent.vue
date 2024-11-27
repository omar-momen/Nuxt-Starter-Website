<template>
  <div
    class="group/content sidebar-content overflow-y-scroll hide-scrollbar py-5 lg:py-0"
    :class="{ isMinimized: isMinimized }"
  >
    <ul @click="emits('closeSideBar')">
      <li v-for="item in sidebar" :key="item.title">
        <NuxtLink
          class="flex items-center gap-3 p-2 transition-all hover:bg-slate-200 duration-700 cursor-pointer"
          :to="localePath(item.path)"
          aria-label="go-to-home-page"
        >
          <Icon
            class="group-[.isMinimized]/content:grow"
            size="25"
            :name="item.icon"
          />
          <span class="group-[.isMinimized]/content:hidden text-lg">
            {{ item.title }}
          </span></NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isMinimized: boolean;
}>();
const emits = defineEmits(["closeSideBar"]);

import getSidebar from "~/data/getSidebar";
const sidebar = getSidebar();

const localePath = useLocalePath();
</script>

<style lang="postcss" scoped>
.sidebar-content {
  height: 100vh;
  max-height: 100vh;

  @screen lg {
    height: calc(100vh - (var(--navbar-top-margin) * 2) - var(--navbar-height));
    max-height: calc(
      100vh - (var(--navbar-top-margin) * 2) - var(--navbar-height)
    );
  }

  a.router-link-exact-active {
    @apply text-primary-700;
  }
}
</style>
