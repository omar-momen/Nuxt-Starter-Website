<template>
  <div
    class="bg-whiteColor dark:bg-darkColor rounded-2xl shadow-lg flex overflow-hidden w-[90%] lg:w-[60vw] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div class="hidden md:flex w-[43%] relative">
      <NuxtImg
        src="/images/join-us.png"
        alt="Business Partner"
        class="w-full object-cover"
        format="webp"
      />
      <div
        class="absolute inset-0 bg-black/20 bg-opacity-40 flex items-start justify-center pt-5"
      >
        <h2 class="text-white text-[26px] text-center font-medium">
          Welcome to <br />
          360 Business Partners
        </h2>
      </div>
    </div>

    <div class="flex flex-col p-8 flex-1">
      <UButton
        @click="$emit('close')"
        class="absolute w-10 h-10 top-4 end-4 rounded-full p-0 flex-center bg-[#F9F9F9]"
        ><CloseIcon class="fill-dark" />
      </UButton>
      <h2 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-7">
        Join us now
      </h2>

      <JoinUsForm @close="$emit('close')" />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);
</script>
