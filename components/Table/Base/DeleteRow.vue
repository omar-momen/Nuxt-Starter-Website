<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }"
  >
    <div class="flex items-center justify-between pb-5">
      <h3
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
      >
        {{ $t("form.confirm_delete") }}
      </h3>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="-my-1"
        @click="$emit('close')"
      />
    </div>
    <div class="flex justify-center gap-3">
      <UButton
        @click="$emit('delete')"
        :label="$t('form.delete')"
        :loading="delete_loading"
        class="transition-all duration-700"
      />
      <UButton
        @click="$emit('close')"
        :label="$t('form.cancel')"
        :disabled="delete_loading"
        color="gray"
        class="transition-all duration-500"
      />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
defineProps<{
  delete_loading: boolean;
}>();
</script>

<style></style>
