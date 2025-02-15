<template>
  <UForm
    :state="state"
    :schema="schema"
    @submit="submit"
    @error="onError"
    class="flex flex-col gap-5"
  >
    <UFormGroup name="name">
      <UInput v-model="state.name" placeholder="Name" />
    </UFormGroup>
    <UFormGroup name="email">
      <UInput v-model="state.email" placeholder="Email" />
    </UFormGroup>
    <UFormGroup name="phone">
      <UInput v-model="state.phone" placeholder="Mobile Phon" />
    </UFormGroup>
    <UFormGroup name="terms">
      <UCheckbox
        v-model="state.terms"
        label="I agree with terms & conditions"
      />
    </UFormGroup>

    <UButton :loading="btnLoading" type="submit" block class="py-3">
      Join us
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

import { object, string, boolean } from "yup";

const state = reactive({
  name: "",
  email: "",
  phone: "",
  terms: false,
});
const schema = object({
  name: string().required("Required"),
  email: string().email("Invalid email").required("Required"),
  phone: string().required("Required"),
  terms: boolean().oneOf(
    [true, "true"],
    "You must accept the terms and conditions"
  ),
});

const btnLoading = ref(false);
const submit = async () => {
  const { error, loading } = await authService().JoinUs(state);
  btnLoading.value = loading;
  if (!error.value) {
    emit("close");
  }
};

// ====== Handle Errors
async function onError(event: { errors: { id: string }[] }) {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}
</script>
