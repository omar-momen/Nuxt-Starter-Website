<template>
  <div
    class="w-screen h-screen fixed z-[999] top-0 left-0 bg-primary-500 flex justify-center items-center bg-opacity-55"
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
