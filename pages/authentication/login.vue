<template>
  <div class="login-page">
    <UContainer>
      <Logo />
      <h1>login</h1>
      <UButton @click="fackLogin">fackLogin</UButton>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "login",
  layout: "auth",
});

const fackLogin = () => {
  useAuthStore().logIn(
    {
      name: "Omar",
      token: "Test_Token",
    },
    true
  );
};
</script>
