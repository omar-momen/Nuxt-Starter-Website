<template>
  <footer
    class="footer pb-10 bg-[url(/images/bg/hero.webp)] bg-cover bg-center bg-no-repeat text-whiteColor"
  >
    <UContainer>
      <div
        class="flex flex-col lg:flex-row gap-20 lg:gap-0 flex-wrap justify-between w-full py-20"
      >
        <div class="flex flex-col w-full lg:w-[30%]">
          <Logo width="367" height="57" :logoBig="true" />
          <h3 class="mt-6 text-base font-light">
            Opening the Door to Financial Knowledge
          </h3>
        </div>

        <div
          class="flex flex-col lg:flex-row gap-10 lg:gap-0 flex-wrap justify-between w-full lg:w-[50%]"
        >
          <div>
            <h4 class="text-base font-bold mb-6">Quick Links</h4>
            <ul class="flex flex-col gap-4">
              <li>
                <nuxt-link to="/">Home</nuxt-link>
              </li>
              <li>
                <nuxt-link to="">About Us</nuxt-link>
              </li>
              <li>
                <nuxt-link to="">Courses</nuxt-link>
              </li>
              <li>
                <nuxt-link to="">Contact Us</nuxt-link>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-base font-bold mb-6">Legal Information</h4>
            <ul class="flex flex-col gap-4">
              <li>
                <nuxt-link to="/">Terms of Services</nuxt-link>
              </li>
              <li>
                <nuxt-link to="">Privacy Policy</nuxt-link>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-base font-bold mb-6">Contact Info</h4>
            <ul class="flex flex-col gap-4">
              <li>
                <a href="mailto:support@360.com">support@360.com</a>
              </li>
              <li>
                <a href="tel:+20-12-456-7890">+20 (12) 456-7890</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="w-full border-t border-whiteColor text-xs font-normal text-[#FEFCF7] border-opacity-50 py-6"
      >
        <div class="flex justify-between items-center">
          <p>@ 2025. All rights reserved.</p>

          <nuxt-link to="/" class="underline">Cookies Settings</nuxt-link>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<style scoped lang="postcss">
li {
  a {
    @apply text-base font-light text-whiteColor  hover:underline;
  }
}
</style>
