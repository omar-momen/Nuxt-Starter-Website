<template>
  <div class="table-empty-state">
    <div class="flex-center flex-col gap-2 py-5">
      <h2 class="text-2xl font-bold text-gray-500">
        {{ $t("table.no_data.title") }}
      </h2>
      <p class="text-md text-gray-400">
        {{ $t("table.no_data.desc") }}
      </p>
      <UButton color="primary" @click="emit('relode-table')">
        {{ $t("table.no_data.btn") }}
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["relode-table"]);
</script>

<style></style>
