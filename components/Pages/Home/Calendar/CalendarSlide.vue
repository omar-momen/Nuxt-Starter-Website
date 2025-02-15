<template>
  <div
    class="group relative w-full rounded-2xl shadow-lg overflow-hidden h-[550px] cursor-pointer"
  >
    <!-- Image -->
    <div class="relative h-full z-[5]">
      <NuxtImg
        format="webp"
        :src="slide.image"
        :alt="slide.title"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
      ></div>
    </div>

    <!-- Info -->
    <div class="absolute bottom-7 left-7 right-7 text-white z-[10]">
      <div class="flex items-center justify-between">
        <div class="max-w-[80%]">
          <h3 class="text-2xl font-semibold text-whiteColor">
            {{ slide.title }}
          </h3>
          <p class="text-base font-medium text-whiteColor">
            {{ slide.description }}
          </p>
        </div>
        <nuxt-link
          to="/"
          class="w-16 h-16 bg-whiteColor group-hover:bg-primary flex-center rounded-full transition-all"
        >
          <GoToIcon class="fill-black group-hover:fill-white" />
        </nuxt-link>
      </div>

      <!-- Timer -->
      <div
        class="group-hover:bg-primary group-hover:text-whiteColor transition-all mt-4 bg-whiteColor py-2 px-3 rounded-lg text-darkColor"
      >
        <div class="flex items-center justify-between text-sm font-medium">
          <div class="flex items-center space-x-3">
            <TimeIcon class="group-hover:fill-white" />
            <h4 class="text-base font-medium">Course Starts After</h4>
          </div>
          <div class="flex gap-5 text-center">
            <div class="flex-center flex-col">
              <span class="text-xl font-bold">{{ time.d }}</span>
              <span class="text-xs font-normal">D</span>
            </div>
            <div class="flex-center flex-col">
              <span class="text-xl font-bold">{{ time.h }}</span>
              <span class="text-xs font-normal">H</span>
            </div>
            <div class="flex-center flex-col">
              <span class="text-xl font-bold">{{ time.m }}</span>
              <span class="text-xs font-normal">M</span>
            </div>
            <div class="flex-center flex-col">
              <span class="text-xl font-bold">{{ time.s }}</span>
              <span class="text-xs font-normal">S</span>
            </div>
          </div>
        </div>
        <div
          class="w-full bg-gray-400 group-hover:bg-gray-400 rounded-full h-[8px] mt-2"
        >
          <div
            class="bg-black group-hover:bg-white h-full rounded-full"
            :style="{ width: slide.progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  slide: Object,
});

const over = ref(false);
const time = ref({
  d: 0,
  h: 0,
  m: 0,
  s: 0,
});
const startCounter = (targetDate) => {
  const targetTime = new Date(targetDate).getTime();

  const intervalId = ref(null);

  const mainLogic = () => {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      over.value = true;
      clearInterval(intervalId.value);
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    time.value = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  // IIfe
  (function () {
    mainLogic();
  })();
  intervalId.value = setInterval(mainLogic, 1000);
};

onMounted(() => {
  startCounter(props.slide.start_date);
});
</script>
