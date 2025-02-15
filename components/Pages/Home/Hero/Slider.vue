<template>
  <div class="slider-container xl:h-full relative" dir="ltr">
    <Swiper class="xl:h-full" v-bind="swiperOptions">
      <SwiperSlide
        class="!flex items-center !justify-start"
        v-for="n in 4"
        :key="n"
      >
        <div
          class="slide-content text-whiteColor p-3"
          :dir="locale == 'en' ? 'ltr' : 'rtl'"
        >
          <button
            class="cool-button text-sm font-normal px-5 py-[10px] flex items-center gap-1 capitalize mb-2 colored"
          >
            Enhance your financial career
          </button>
          <h1 class="text-3xl xl:text-6xl font-bold max-w-[650px]">
            Advance Your Career with Expert Finance Courses
          </h1>
          <p
            class="paragraph !text-whiteColor !font-extralight max-w-[500px] mt-4"
          >
            Unlock Your Future with Comprehensive Accounting & Finance Courses:
            Flexible Online and Offline Learning with Business 360
          </p>
          <UButton
            class="mt-10 rounded-2xl py-3"
            color="primary"
            variant="solid"
            >Get started Today</UButton
          >
        </div>
      </SwiperSlide>
    </Swiper>
    <div
      class="custom-pagination"
      :class="{
        'justify-start': locale == 'en',
        'justify-end': locale == 'ar',
      }"
    ></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const swiperOptions = {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 1000,
  pagination: {
    el: ".custom-pagination",
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class="${className} custom-bullet"></span>`;
    },
  },
  breakpoints: {
    10: {
      direction: "horizontal",
    },
    1280: {
      direction: "vertical",
    },
  },
  modules: [Pagination, Autoplay],
};

const { locale } = useI18n();
</script>

<style lang="postcss">
.custom-pagination {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-block: 30px;
  /* margin-inline: 20px; */

  @media (min-width: 1280px) {
    position: absolute;
    top: 50%;
    margin: 0;
    transform: translateY(-50%);
    z-index: 2;
    left: -40px !important;
    right: unset !important;
    display: flex;
    flex-direction: column;
  }

  .custom-bullet {
    width: 8px;
    height: 8px;
    background: #fff;
    opacity: 0.5;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;

    &.swiper-pagination-bullet-active {
      width: 28px;
      @media (min-width: 1280px) {
        width: 8px;
        height: 28px;
      }
      opacity: 1;
      transform: scale(1.5);
    }
  }
}

body[dir="rtl"] {
  @media (min-width: 1280px) {
    .custom-pagination {
      left: unset !important;
      right: -40px !important;
    }
  }

  .swiper-slide {
    justify-content: flex-end !important;
  }
}
</style>
