<template>
  <div class="default-layout">
    <TheNavbar />
    <div class="inside-view pt-[var(--navbar-height)]">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const sideBarlinks = [
  {
    label: "Home",
    icon: "i-heroicons-chart-bar",
    to: "/",
  },
  {
    label: "Users",
    icon: "i-heroicons-users",
    to: "/users",
  },
];
</script>
