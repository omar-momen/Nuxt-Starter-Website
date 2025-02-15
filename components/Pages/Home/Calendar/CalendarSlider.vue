<template>
  <div class="slider-container calendar relative" dir="ltr">
    <Swiper v-bind="swiperOptions">
      <SwiperSlide
        class="!flex items-center !justify-start"
        v-for="slide in slides"
        :key="slide.id"
      >
        <CalendarSlide :slide="slide" />
      </SwiperSlide>
    </Swiper>
    <div class="custom-pagination-calendar"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const swiperOptions = {
  direction: "horizontal",
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
  },
  speed: 1000,
  pagination: {
    el: ".custom-pagination-calendar",
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class="${className} custom-bullet"></span>`;
    },
  },
  breakpoints: {
    10: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  modules: [Pagination, Autoplay],
};

const slides = [
  {
    id: 1,
    image: "/temp/images/slider1.png",
    title: "Accounting",
    description: "This course will start on the 2nd month of 2025",
    start_date: "2025-02-13",
    progress: 50,
  },
  {
    id: 2,
    image: "/temp/images/slider2.png",
    title: "Finance",
    description: "This course will start on the 3rd month of 2025",
    start_date: "2025-02-25",
    progress: 30,
  },
  {
    id: 3,
    image: "/temp/images/slider3.png",
    title: "Business",
    description: "This course will start on the 4th month of 2025",
    start_date: "2025-04-01",
    progress: 70,
  },
  {
    id: 4,
    image: "/temp/images/slider2.png",
    title: "Marketing",
    description: "This course will start on the 5th month of 2025",
    start_date: "2025-05-01",
    progress: 90,
  },
];
</script>

<style lang="postcss">
.calendar {
  .custom-pagination-calendar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: absolute;
    bottom: -30px !important;
    top: unset !important;
    margin: 0;
    left: 50% !important;
    transform: translateX(-50%);
    right: unset !important;
    z-index: 2;

    .custom-bullet {
      width: 8px;
      height: 8px;
      background: #d93749;
      opacity: 0.5;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s;

      &.swiper-pagination-bullet-active {
        width: 28px;
        opacity: 1;
        transform: scale(1.5);
      }
    }
  }

  .swiper {
    overflow: visible !important;
  }
}
</style>
