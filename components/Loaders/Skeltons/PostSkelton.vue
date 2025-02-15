<template>
  <div
    class="flex flex-col gap-2 bg-whiteColor dark:bg-darkColor p-5 rounded-lg shadow-md mb-4"
  >
    <USkeleton class="w-3/4 h-3" :ui="{ rounded: 'rounded-md' }" />

    <USkeleton class="w-[80%] h-2" :ui="{ rounded: 'rounded-lg' }" />
    <USkeleton class="w-[80%] h-2" :ui="{ rounded: 'rounded-lg' }" />
    <USkeleton class="w-[80%] h-2" :ui="{ rounded: 'rounded-lg' }" />

    <div class="flex justify-between items-center">
      <USkeleton class="w-32 h-4" :ui="{ rounded: 'rounded-lg' }" />
      <USkeleton class="w-32 h-4" :ui="{ rounded: 'rounded-lg' }" />
    </div>
  </div>
</template>
