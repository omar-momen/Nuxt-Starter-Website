<template>
  <div class="table-filter">
    <UForm :state="state">
      <div class="flex items-center flex-wrap gap-5 border-y py-4 my-5">
        <div v-for="input in filters" :key="input.key">
          <!-- Text -->
          <UFormGroup
            v-if="input.type == 'search'"
            :label="input.label"
            :name="input.key"
          >
            <UInput
              :placeholder="input.placeholder"
              v-model.lazy="state[input.key]"
              type="text"
              class="w-64"
            />
          </UFormGroup>
          <!-- Number -->
          <UFormGroup
            v-if="input.type == 'number'"
            :label="input.label"
            :name="input.key"
          >
            <UInput
              :placeholder="input.placeholder"
              type="number"
              v-model="state[input.key]"
            />
          </UFormGroup>
          <!-- Select -->
          <UFormGroup
            v-if="input.type == 'select'"
            :label="input.label"
            :name="input.key"
          >
            <SelectInput
              v-if="input.getEndpoint"
              :getEndpoint="input.getEndpoint"
              v-model="state[input.key]"
              :multiple="input.multiple"
              :placeholder="input.placeholder"
              searchable
              :searchable-placeholder="
                input.searchablePlaceholder ||
                $t('form.search') + ' ' + input.label + '...'
              "
              clearable
            />
            <SelectInput
              v-else
              v-model="state[input.key]"
              :options="input.options"
              :multiple="input.multiple"
              :placeholder="input.placeholder"
              searchable
              :searchable-placeholder="
                input.searchablePlaceholder ||
                $t('form.search') + ' ' + input.label + '...'
              "
              clearable
            />
          </UFormGroup>
        </div>
      </div>

      <div class="flex flex-wrap gap-x-5 gap-y-0 items-center">
        <!-- Select -->
        <UFormGroup :label="$t('table.per_page')" name="par_page">
          <SelectInput
            v-model="state.per_page"
            :options="PER_PAGE_OPTIONS"
            :placeholder="$t('table.per_page')"
            class="min-w-20"
          />
        </UFormGroup>

        <!-- Reset Filter -->
        <UButton
          class="transition-all duration-500 mt-6"
          color="red"
          variant="solid"
          :label="t('form.reset')"
          @click="resetFilters"
          :disabled="resetDisabled"
        >
          <template #leading>
            <Icon name="material-symbols:format-color-reset-rounded" />
          </template>
        </UButton>

        <!-- Reload Table -->
        <UButton
          class="transition-all duration-500 mt-6"
          color="purple"
          variant="solid"
          :label="t('form.reload')"
          @click="reloadTable"
        >
          <template #leading>
            <Icon name="material-symbols-light:directory-sync-rounded" />
          </template>
        </UButton>

        <!-- Export Table -->
        <UButton
          :disabled="!useHelpers().hasPermission(permissions.export)"
          class="transition-all duration-500 mt-6"
          color="blue"
          variant="solid"
          :label="t('form.export')"
          @click="exportTable"
        >
          <template #leading>
            <Icon name="clarity:export-solid" />
          </template>
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["filter-table", "reload-table", "export-table"]);
const props = defineProps<{
  filters: any[];
  permissions: Record<string, string>;
}>();

// =====> Imports
const { PER_PAGE_OPTIONS, PER_PAGE_DEFAULT } = useConstants();

// ====== Globals
const { t } = useI18n();

// ====== State
interface State {
  per_page: number;
  [key: string]: any;
}
const state: State = reactive({
  per_page: PER_PAGE_DEFAULT,
});
props.filters.forEach((filter) => {
  if (filter.multiple) {
    state[filter.key] = [];
  } else {
    state[filter.key] = "";
  }
});
watch(
  () => state,
  () => {
    emit("filter-table", state);
  },
  { deep: true }
);

// ====== Reset Filters
const resetFilters = () => {
  Object.keys(state).forEach((key) => {
    if (key !== "per_page") {
      state[key] = "";
    }
  });
};
const resetDisabled = computed(() => {
  let disabled = true;
  Object.keys(state).forEach((key) => {
    if (
      key !== "per_page" &&
      key !== "page" &&
      state[key] &&
      !(Array.isArray(state[key]) && state[key].length === 0)
    ) {
      disabled = false;
    }
  });
  return disabled;
});

// ====== Export Table
const exportTable = () => {
  emit("export-table");
};

// ====== Reload Table
const reloadTable = () => {
  emit("reload-table");
};
</script>
