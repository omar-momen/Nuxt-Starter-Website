<template>
  <div class="app">
    <AppLoader v-if="appStore?.appInitLoading" />

    <div class="layout-wrapper">
      <NuxtLayout>
        <PageLoader v-if="appStore?.pageLoading" />
        <div class="page-wrapper">
          <NuxtPage />
        </div>
        <NuxtLoadingIndicator />
      </NuxtLayout>
    </div>

    <UNotifications />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const appStore = useAppStore();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - ${nuxtApp.$i18n.t("app.title")}`
      : nuxtApp.$i18n.t("app.title");
  },
  meta: [
    {
      name: "charset",
      content: "utf-8",
    },
    {
      name: "description",
      content: nuxtApp.$i18n.t("app.desc"),
    },
    {
      name: "author",
      content: nuxtApp.$i18n.t("app.title"),
    },
    {
      property: "og:title",
      content: nuxtApp.$i18n.t("app.title"),
    },
    {
      property: "og:descreption",
      content: nuxtApp.$i18n.t("app.desc"),
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content: "/images/logo/logo-big.png",
    },
    {
      property: "og:url",
      content: "https://arweqh-task.vercel.app/",
    },

    // Twitter
    {
      property: "twitter:title",
      content: nuxtApp.$i18n.t("app.title"),
    },
    {
      property: "twitter:descreption",
      content: nuxtApp.$i18n.t("app.desc"),
    },
    {
      property: "twitter:type",
      content: "website",
    },
    {
      property: "twitter:image",
      content: "/images/logo/logo-big.png",
    },
    {
      property: "twitter:url",
      content: nuxtApp.$i18n.t("app.title"),
    },
  ],
});
</script>
