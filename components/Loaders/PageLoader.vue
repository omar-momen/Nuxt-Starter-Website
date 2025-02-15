<template>
  <div
    class="w-100 h-screen absolute z-[997] bg-primary-200 flex justify-center items-center inset-0"
  >
    <div class="loader"></div>
  </div>
</template>

<style lang="postcss" scoped>
.loader {
  @apply w-12 h-12 rounded-full;
  background: conic-gradient(
    from 0deg at 50% 50%,
    #d93749,
    #fbd0d0,
    #fde7e6,
    #d93749
  );
  animation: spin 1.5s linear infinite;
}
</style>
