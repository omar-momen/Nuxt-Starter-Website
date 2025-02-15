<template>
  <nav
    ref="navElement"
    :class="{ isHome: isHome }"
    class="bg-darkColor fixed z-[998] left-0 right-0 top-0 h-[var(--navbar-height)] lg:transition-all lg:duration-[800ms] shadow-lg shadow-slate-500 dark:shadow-slate-800"
  >
    <UContainer class="flex justify-between items-center py-4">
      <Logo class="me-5" width="190px" height="30px" />

      <NavLinks class="hidden xl:flex items-center gap-10 text-whiteColor" />

      <ul class="items-center gap-2 hidden xl:flex">
        <button
          @click="joinUsModal = true"
          class="cool-button px-5 py-[10px] flex items-center gap-1 colored"
        >
          Join us
          <ArrowRight />
        </button>
        <button
          class="cool-button rounded-full flex items-center justify-center"
        >
          <SearchIcon />
        </button>
        <LangSwitcher />
        <ThemeSwitcher />
      </ul>

      <UButton
        @click="navMenuSideOver = true"
        class="p-0 xl:hidden block"
        variant="ghost"
        aria-label="close"
      >
        <MenuIcon class="stroke-whiteColor" />
      </UButton>
    </UContainer>

    <!-- Menu Links SlideOver -->
    <USlideover v-model="navMenuSideOver">
      <div class="p-4 flex-1">
        <UButton
          color="primary"
          variant="ghost"
          size="md"
          icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-5 z-10"
          square
          padded
          @click="navMenuSideOver = false"
          aria-label="close"
        />
        <div class="flex gap-5 items-center justify-center my-10">
          <button
            @click="joinUsModal = true"
            class="cool-button px-5 py-[10px] flex items-center gap-1 colored"
          >
            Join us
            <ArrowRight />
          </button>
          <button
            class="cool-button rounded-full flex items-center justify-center"
          >
            <SearchIcon />
          </button>
        </div>
        <NavLinks
          class="flex justify-center items-center flex-col gap-8"
          @close="navMenuSideOver = false"
        />
        <LangSwitcher class="mt-16 flex justify-center" />
      </div>
    </USlideover>

    <!-- Join Us Modal -->
    <UModal v-model="joinUsModal">
      <JoinUs @close="joinUsModal = false" />
    </UModal>
  </nav>
</template>

<script setup lang="ts">
const navMenuSideOver = ref(false);
const joinUsModal = ref(false);

const isHome = computed(() => {
  return (
    useRoute().path === "/" ||
    useRoute().path === `/ar` ||
    useRoute().path === `/en`
  );
});

const navElement = ref(null);
onMounted(() => {
  const optimizedScroll = useHelpers().throttle(() => {
    if (window.scrollY > 100) {
      navElement.value.classList.add("stickyNav");
    } else {
      navElement.value.classList.remove("stickyNav");
    }
  }, 100);
  window.addEventListener("scroll", optimizedScroll);
});
</script>

<style lang="postcss" scoped>
nav {
  &.isHome {
    background: transparent;
    box-shadow: none;
  }

  &.stickyNav {
    @apply bg-darkColor shadow-md shadow-slate-800 dark:shadow-slate-800;
  }
}
</style>
