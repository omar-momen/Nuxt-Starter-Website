<template>
  <div class="table-head">
    <div class="flex justify-between">
      <h2
        class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
      >
        {{ table_title }}
      </h2>
      <UButton
        :disabled="!useHelpers().hasPermission(permissions.create)"
        class="transition-all duration-500"
        color="primary"
        variant="solid"
        :label="t('form.add') + ' ' + t(`CRUDS.${endpoint}.single`)"
        @click="$emit('open-edit-add-modal')"
      >
        <template #leading>
          <Icon name="material-symbols:add" />
        </template>
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["open-edit-add-modal"]);
defineProps<{
  table_title: string;
  endpoint: string;
  permissions: Record<string, string>;
}>();

const { t } = useI18n();
</script>
