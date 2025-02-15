<template>
  <section>
    <UContainer>
      <div
        class="about-section flex flex-wrap flex-col gap-10 lg:gap-0 lg:flex-row items-center justify-between rounded-2xl"
      >
        <div class="flex flex-col w-full lg:w-[50%]">
          <GrayBadge text="Why us" class="w-fit" />
          <h2 class="mb-3 text-3xl md:text-5xl font-bold">Why Business 360?</h2>
          <p class="mt-2 paragraph w-full lg:w-[65%]">
            Join Thousands of Professionals Who Have Advanced Their Careers with
            Our Accredited Finance Courses. We offer more than just courses; we
            provide pathways to a successful career in finance.
          </p>
          <div class="mt-5 flex flex-wrap md:flex-row items-center gap-4">
            <UButton class="py-4 px-14 mt-2"> Join us + </UButton>
            <ul class="flex items-center mt-2 -space-x-3">
              <li
                class="w-12 h-12 rounded-full border-2 border-white dark:border-darkColor"
              >
                <NuxtImg
                  class="xl:w-[48px] xl:h-[48px]"
                  width="48"
                  height="48"
                  src="/temp/images/avatar1.png"
                  alt="star"
                  format="webp"
                />
              </li>
              <li
                class="w-12 h-12 rounded-full border-2 border-white dark:border-darkColor"
              >
                <NuxtImg
                  class="xl:w-[48px] xl:h-[48px]"
                  width="48"
                  height="48"
                  src="/temp/images/avatar2.png"
                  alt="star"
                  format="webp"
                />
              </li>
              <li
                class="w-12 h-12 rounded-full border-2 border-white dark:border-darkColor"
              >
                <NuxtImg
                  class="xl:w-[48px] xl:h-[48px]"
                  width="48"
                  height="48"
                  src="/temp/images/avatar3.png"
                  alt="star"
                  format="webp"
                />
              </li>
              <li
                class="w-12 h-12 xl:w-[53px] xl:h-[53px] rounded-full border-2 border-white bg-[#DCDCDC] text-darkColor font-normal flex-center text-lg"
              >
                2k+
              </li>
            </ul>
          </div>
        </div>

        <!-- Video -->
        <div class="w-full lg:w-[50%] p-0 lg:ps-10">
          <div
            class="relative rounded-xl max-w-[500px] h-[300px] mx-0 lg:mx-auto"
          >
            <div
              class="absolute inset-0 z-10 bg-[#080F1D26]/20 backdrop-blur-sm rounded-xl w-full h-full"
              :class="{
                'bg-[#080F1D26]/20': !isPlaying,
                hidden: isPlaying,
              }"
            >
              <button
                @click="playVideo"
                ref="playButton"
                class="w-14 h-14 bg-whiteColor dark:bg-darkColor rounded-full flex-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <PlayVideoIcon class="fill-darkColor dark:fill-whiteColor" />
              </button>
            </div>

            <video
              ref="video"
              class="w-full h-full object-cover rounded-xl ]"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
            ></video>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
const isPlaying = ref(false);
const video = ref(null);
const playButton = ref(null);

const playVideo = () => {
  handlePlayPause();
};

const handlePlayPause = () => {
  if (video.value) {
    if (video.value.paused) {
      video.value.play();
      isPlaying.value = true;
    } else {
      video.value.pause();
      isPlaying.value = false;
    }
  }
};

onMounted(() => {
  video.value.addEventListener("ended", () => {
    isPlaying.value = false;
  });
});
</script>
