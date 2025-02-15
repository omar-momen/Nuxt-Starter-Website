<template>
  <div @click="chnageLang">
    <button
      class="cool-button rounded-full flex items-center justify-center capitalize gap-[2px]"
    >
      {{ lang === "en" ? "ar" : "en" }}
      <ArrowDown />
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale, setLocale } = useI18n();

const lang = computed({
  get: () => locale.value,
  set: async (val) => {
    await setLocale(val);

    // reload the page
    location.reload();
  },
});

const chnageLang = () => {
  lang.value = lang.value === "en" ? "ar" : "en";
};
</script>
