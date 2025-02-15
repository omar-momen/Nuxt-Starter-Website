<template>
  <section class="how-we-work-section">
    <UContainer>
      <GrayBadge text="How does we work" />
      <h2 class="mb-3 text-3xl md:text-5xl font-bold">How dose we work?</h2>
      <p class="mt-2 paragraph">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      <div class="shapes flex flex-wrap items-center my-16 text-center">
        <div
          class="shape bg-gray-200 rounded-xl p-5 sm:bg-transparent w-full md:w-1/2 lg:w-1/4 my-4 flex flex-col items-center gap-5 relative"
        >
          <NuxtImg
            width="113"
            height="101"
            src="/temp/images/shape1.png"
            format="webp"
          />
          <h2 class="text-2xl font-medium">Dummy test</h2>
          <p class="paragraph w-[90%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <LongArrowIcon
            class="absolute -end-[20%] stroke-darkColor dark:stroke-whiteColor hidden xl:block"
          />
        </div>
        <div
          class="shape bg-gray-200 rounded-xl p-5 border-1 border-gray-300 sm:bg-transparent w-full md:w-1/2 lg:w-1/4 my-4 flex flex-col items-center gap-5 relative"
        >
          <NuxtImg
            width="113"
            height="110"
            src="/temp/images/shape2.png"
            format="webp"
          />
          <h2 class="text-2xl font-medium">Dummy test</h2>
          <p class="paragraph w-[90%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <LongArrowIcon
            class="absolute -end-[20%] stroke-primary hidden xl:block"
          />
        </div>
        <div
          class="shape bg-gray-200 rounded-xl p-5 border-1 border-gray-300 sm:bg-transparent w-full md:w-1/2 lg:w-1/4 my-4 flex flex-col items-center gap-5 relative"
        >
          <NuxtImg
            width="113"
            height="105"
            src="/temp/images/shape3.png"
            format="webp"
          />
          <h2 class="text-2xl font-medium">Dummy test</h2>
          <p class="paragraph w-[90%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <LongArrowIcon
            class="absolute -end-[20%] stroke-darkColor dark:stroke-whiteColor hidden xl:block"
          />
        </div>
        <div
          class="shape bg-gray-200 rounded-xl p-5 border-1 border-gray-300 sm:bg-transparent w-full md:w-1/2 lg:w-1/4 my-4 flex flex-col items-center gap-5"
        >
          <NuxtImg
            width="125"
            height="105"
            src="/temp/images/shape4.png"
            format="webp"
          />
          <h2 class="text-2xl font-medium">Dummy test</h2>
          <p class="paragraph w-[90%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>
