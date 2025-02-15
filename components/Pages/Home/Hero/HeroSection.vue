<template>
  <header
    class="hero-header bg-[url(/images/bg/hero.webp)] xl:h-screen bg-cover bg-center bg-no-repeat"
  >
    <UContainer class="pt-28 xl:h-full">
      <div class="flex flex-col xl:flex-row xl:h-full">
        <!-- Slider -->
        <div class="w-full xl:w-[50%]">
          <Slider />
        </div>

        <!-- Image -->
        <div class="w-full xl:w-[50%] lg:h-full flex-center">
          <div class="h-full relative">
            <NuxtImg
              width="440px"
              height="641px"
              class="mt-10 lg:mt-0 w-[240px] lg:w-[440px] h-[350px] lg:h-full"
              src="/images/hero-person.png"
              format="webp"
            />
            <div
              class="absolute top-[18%] -start-[30%] xl:-start-[20%] flex flex-col justify-center items-start bg-darkColor/50 backdrop-blur-md p-5 w-[140px] xl:w-[220px] rounded-xl text-whiteColor"
            >
              <GraduateIcon class="mb-3" />
              <h4 class="text-xs font-light xl:text-lg">
                <span class="text-primary font-bold">100k</span> Students <br />
                Learn Daily
              </h4>
            </div>
            <div
              class="absolute bottom-[8%] -start-[30%] xl:-start-[20%] flex flex-col justify-center items-start bg-darkColor/50 backdrop-blur-md px-5 py-6 w-[160px] xl:w-[220px] rounded-xl text-whiteColor"
            >
              <h4 class="text-xs font-semibold xl:text-lg">
                Our Happy Students
                <span class="text-[12px] mt-0 lg:-mt-1 block font-normal"
                  >20k+ User
                </span>
              </h4>
              <ul class="flex items-center mt-2 -space-x-3">
                <li>
                  <NuxtImg
                    class="w-[20px] xl:w-[35px] h-[20px] xl:h-[35px]"
                    sizes="35"
                    height="35"
                    src="/temp/images/avatar1.png"
                    alt="star"
                    format="webp"
                  />
                </li>
                <li>
                  <NuxtImg
                    class="w-[20px] xl:w-[35px] h-[20px] xl:h-[35px]"
                    width="35"
                    height="35"
                    src="/temp/images/avatar2.png"
                    alt="star"
                    format="webp"
                  />
                </li>
                <li>
                  <NuxtImg
                    class="w-[20px] xl:w-[35px] h-[20px] xl:h-[35px]"
                    width="35"
                    height="35"
                    src="/temp/images/avatar3.png"
                    alt="star"
                    format="webp"
                  />
                </li>
                <li>
                  <NuxtImg
                    class="w-[20px] xl:w-[35px] h-[20px] xl:h-[35px]"
                    width="35"
                    height="35"
                    src="/temp/images/avatar4.png"
                    alt="star"
                    format="webp"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </header>
</template>

<style lang="postcss">
header.hero-header {
  margin-top: calc(-1 * (var(--navbar-height) + 2rem));
}
</style>
