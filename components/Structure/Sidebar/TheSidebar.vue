<template>
  <nav
    class="sidebar group shadow-lg rounded-xl bg-whiteColor fixed z-[5] start-[var(--sidebar-navbar-x-margin)] top-[var(--navbar-top-margin)] h-full lg:transition-all lg:duration-[800ms] pt-[var(--navbar-height)]"
    :class="{ 'nav-minimized': isMinimized }"
  >
    <div class="absolute top-3 end-3 group-[.nav-minimized]:end-3">
      <SidebarMenuIcon
        :isMinimized="isMinimized"
        @toggleSidebar="toggleSidebar"
      />
    </div>
    <SideBarContent
      @closeSideBar="emits('closeSideBar')"
      :isMinimized="isMinimized"
    />
  </nav>
</template>

<script setup lang="ts">
const emits = defineEmits(["toggleSidebar", "closeSideBar"]);
const props = defineProps<{
  isMinimized: boolean;
  links: { label: string; icon: string; to: string }[];
}>();

const toggleSidebar = () => {
  emits("toggleSidebar", props.isMinimized);
};
</script>

<style lang="postcss" scoped>
.sidebar {
  width: calc(var(--max-sidebar-width) - (var(--sidebar-navbar-x-margin) * 2));
  height: calc(100vh - (var(--navbar-top-margin) * 2));
  max-height: calc(100vh - (var(--navbar-top-margin) * 2));

  &.nav-minimized {
    width: calc(
      var(--min-sidebar-width) - (var(--sidebar-navbar-x-margin) * 2)
    );
  }
}
</style>
