<template>
  <BaseCrud
    :table_title="$t(`CRUDS.tasks.title`)"
    :columns="columns"
    :form="form"
    :filters="filters"
    :permissions="{
      create: 'tasks-create',
      read: 'tasks-read',
      update: 'tasks-update',
      delete: 'tasks-delete',
      view: 'tasks-view',
      export: 'tasks-export',
    }"
    endpoint="tasks"
    selectable
    dragable
  >
    <!-- Data Cells Slots use it with [`column.key`-data] -->
    <template #created_at-data="{ row, column }">
      <div class="flex-center">
        {{ new Date(row.created_at).toLocaleDateString() }}
      </div>
    </template>

    <!-- Columns Cells Slots use it with [`column.key`-header] -->
    <template #lesson_id-header="{ column }">
      <div class="flex-center">
        <span class="me-2">{{ column.key }}</span>
        <Icon size="20" name="streamline:class-lesson" />
      </div>
    </template>
  </BaseCrud>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Tasks",
  requireAuth: true,
});

// =====> Locals
const { t } = useI18n();

// =====> Data
const { GENDERS_OPTIONS } = useConstants();

// =====> Columns
const columns = [
  {
    key: "id",
    label: "#",
    sortable: true,
  },
  {
    key: "image",
    label: t("labels.image"),
    image: true,
  },
  {
    key: "name",
    label: t("labels.name"),
    sortable: true,
  },
  {
    key: "description",
    label: t("labels.description"),
    long_text: true,
  },
  {
    key: "created_at",
    label: t("labels.created_at"),
  },
  {
    key: "updated_at",
    label: t("labels.updated_at"),
    date: true,
  },
  {
    key: "lesson_id",
    label: t("labels.lesson"),
  },
  {
    key: "tickets",
    label: t("labels.tickets"),
    chips: true,
  },
];

// =====> Form Inputs
const form = [
  {
    key: "image",
    label: t("labels.image"),
    placeholder: `${t("labels.upload")} ${t("labels.image")}`,
    type: "file-image",
    required: true,
  },
  {
    key: "name",
    label: t("labels.name"),
    placeholder: `${t("labels.enter")} ${t("labels.name")}`,
    type: "text",
    validations: [
      {
        valid: useValidation().isRequired,
        message: `${t("labels.name")} ${t("validation.required")}`,
      },
    ],
  },
  {
    key: "description",
    label: t("labels.description"),
    placeholder: `${t("labels.enter")} ${t("labels.description")}`,
    type: "textarea",
    required: true,
    validations: [
      {
        valid: useValidation().isRequired,
        message: `${t("labels.description")} ${t("validation.required")}`,
      },
    ],
  },
  {
    key: "lesson_id",
    label: t("labels.lesson"),
    placeholder: `${t("labels.choose")} ${t("labels.lesson")}`,
    type: "select",
    getEndpoint: "lessons",
    required: true,
  },
  {
    key: "tickets",
    label: t("labels.tickets"),
    placeholder: `${t("labels.choose")} ${t("labels.tickets")}`,
    type: "select",
    getEndpoint: "tickets",
    multiple: true,
    required: true,
  },
  {
    key: "gender",
    label: t("labels.gender"),
    placeholder: `${t("labels.choose")} ${t("labels.gender")}`,
    options: GENDERS_OPTIONS,
    type: "select",
    required: true,
  },
  {
    key: "is_active",
    label: t("labels.is_active"),
    type: "switch",
  },
];

// =====> Filters
const filters = [
  {
    key: "name",
    label: t("labels.name"),
    placeholder: `${t("labels.search_with")} ${t("labels.name")} ...`,
    type: "search",
  },
  {
    key: "lesson_id",
    label: t("labels.lesson"),
    placeholder: `${t("labels.choose")} ${t("labels.lesson")}`,
    type: "select",
    getEndpoint: "lessons",
  },
  {
    key: "tickets",
    label: t("labels.tickets"),
    placeholder: `${t("labels.choose")} ${t("labels.tickets")}`,
    type: "select",
    getEndpoint: "tickets",
    multiple: true,
  },
  {
    key: "gender",
    label: t("labels.gender"),
    placeholder: `${t("labels.choose")} ${t("labels.gender")}`,
    options: GENDERS_OPTIONS,
    type: "select",
  },
];
</script>
