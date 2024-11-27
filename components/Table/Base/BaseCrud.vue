<script lang="ts" setup>
const props = defineProps<{
  columns: any[];
  endpoint: string;
  table_title: string;
  form?: any[];
  filters: any[];
  expandable?: boolean;
  external_form?: boolean;
  selectable?: boolean;
  dragable?: boolean;
  permissions: {
    create?: string;
    read?: string;
    update?: string;
    delete?: string;
    view?: string;
    export?: string;
  };
}>();

// =====> Globals
const crud_service = crudService();

// =====> Row Type
type Row = {
  id: number;
  [key: string]: any;
};

// =====> Pagination
const { PER_PAGE_DEFAULT } = useConstants();
const page = ref(1);
const perPage = ref(PER_PAGE_DEFAULT);

// =====> Fetch Rows
const filter_params = ref<{ page: Ref; per_page: Ref }>({
  page: page,
  per_page: perPage,
});

const { data, refresh, execute, status } = await crud_service.getTable<{
  data: Row[];
  meta: {
    total: number;
  };
}>(props.endpoint, {
  params: filter_params,
  default: () => [],
  watch: [page],
});
const rows = computed<Row[]>({
  get: () => data?.value?.data || [],
  set: (value: Row[]) => {
    if (data?.value) {
      data.value.data = value;
    }
  },
});
const totalRows = computed(() => data?.value?.meta?.total || 0);

// =====> Filter Table
const filter_table = (params: any) => {
  filter_params.value = params;
  filter_params.value.page = page;
  perPage.value = params.per_page;
  execute();
};

// =====> Selected Rows
const selectedRows = ref<Row[]>([]);
function select(row: Row) {
  const index = selectedRows.value.findIndex((item: Row) => item.id === row.id);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }

  // =====> Check if all rows are selected
  const checkboxes = document.querySelectorAll(
    `.${props.endpoint}-crud input[type="checkbox"]`
  );
  if (selectedRows.value.length === rows.value?.length) {
    (checkboxes[0] as HTMLInputElement).checked = true;
  } else {
    (checkboxes[0] as HTMLInputElement).checked = false;
  }
}
function select_deselct_all() {
  const checkboxes = document.querySelectorAll(
    `.${props.endpoint}-crud input[type="checkbox"]`
  );
  if (selectedRows.value.length === rows.value?.length) {
    selectedRows.value = [];
    // =====> Uncheck all checkboxes
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  } else {
    selectedRows.value = rows.value ? [...rows.value] : [];
    // =====> Check all checkboxes
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = true;
    });
  }
}

// =====> Export Table
const exportTable = async () => {
  await crud_service.exportTable(
    props.endpoint,
    filter_params.value,
    props.endpoint,
    "xlsx"
  );
};

// =====> Delete Row
const delete_loading = ref(false);
const row_id_to_delete = ref<number | null>(null);
const delete_row_dialog = ref(false);
const deleteRow = async () => {
  delete_loading.value = true;

  if (await crud_service.deleteRow(props.endpoint, row_id_to_delete.value)) {
    // =====> Update Table
    await refresh();
  }

  delete_row_dialog.value = false;
  delete_loading.value = false;
  row_id_to_delete.value = null;
};

// ==================> Add/Edit Row
const edit_add_row_dialog = ref(false);
const inputs = ref<any[]>([]);

// ====== Add
const addItem = () => {
  setItemKeysForAdd();
  edit_add_row_dialog.value = true;
};
const setItemKeysForAdd = () => {
  props.form?.forEach((item: any) => {
    if (!item.not_addable) {
      inputs.value.push({ ...item, val: null });
    }
  });
};

// ====== Edit
const editItem = (row: Row) => {
  current_row.value = row;
  setItemKeysForEdit(row);
  edit_add_row_dialog.value = true;
};
const setItemKeysForEdit = (row: Row) => {
  props.form?.forEach((item: any) => {
    inputs.value.push({ ...item, val: null });
  });

  setEditedItemValues(row);
};
const setEditedItemValues = (row: Row) => {
  for (let row_key in row) {
    inputs.value.forEach((input) => {
      if (input.key == row_key) {
        // Switch
        if (input.type == "switch") {
          input.val = !!row[row_key];
          return;
        }
        // Select Static
        else if (input.staticItems) {
          input.val = input.staticItems.find(
            (staticItem: any) => staticItem.id == row[row_key]
          );
          return;
        }
        // Select Multiple
        else if (input.multiple) {
          input.val = row[row_key].map((item: any) => {
            return item;
          });
          return;
        }
        // Select Single
        else if (input.type == "select" && !input.multiple) {
          input.val = row[row_key];
          return;
        }
        // Default
        else {
          input.val = row[row_key];
        }
      }
    });
  }
};

const current_row = ref<Row | null>(null);
const edit_mode = computed(() => !!current_row.value);
// Watch Dialog to Reset Values
watch(edit_add_row_dialog, (value) => {
  if (!value) {
    current_row.value = null;
    inputs.value = [];
  }
});

// =====> Image Modal
const showImageModal = ref(false);
const current_image = ref<string | undefined>("");

// =====> Drag Row
import draggable from "vuedraggable";
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: !props.dragable,
    ghostClass: "ghost",
  };
});
const onDragEnd = async (event: any) => {
  const { oldIndex, newIndex } = event;
  const row = rows.value[oldIndex];
  await crud_service.reOrderRow(`${props.endpoint}/reorder/${row.id}`, {
    page: page.value,
    per_page: perPage.value,
    order: newIndex,
  });
};
</script>

<template>
  <div :class="[`${endpoint}-crud`]">
    <UContainer>
      <UCard
        class="w-full"
        :ui="{
          base: '',
          ring: '',
          divide: 'divide-y divide-gray-200 dark:divide-gray-700',
          header: { padding: 'px-4 py-5' },
          body: {
            padding: '',
            base: 'divide-y divide-gray-200 dark:divide-gray-700',
          },
          footer: { padding: 'p-4' },
        }"
      >
        <template #header>
          <!-- Header -->
          <TableHead
            @open-edit-add-modal="addItem"
            :table_title="table_title"
            :endpoint="endpoint"
            :permissions="permissions"
          />

          <!-- Filters -->
          <TableFilter
            :filters="filters"
            @filter-table="filter_table"
            @reload-table="refresh"
            @export-table="exportTable"
            :permissions="permissions"
          />
        </template>

        <!-- Table -->
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <div v-if="status === 'pending'">
              <SkeletonTable
                :rows="rows"
                :columns="columns"
                :selectable="selectable"
              />
            </div>
            <template v-else>
              <TableEmpty v-if="!data" @relode-table="refresh" />

              <template v-else>
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <!-- Select Box -->
                    <th
                      v-if="selectable"
                      scope="col"
                      class="p-4"
                      @change="select_deselct_all"
                    >
                      <div class="flex items-center">
                        <UCheckbox name="notifications" />
                      </div>
                    </th>

                    <!-- Rest of the columns -->
                    <th
                      v-for="column in columns"
                      :key="column.key"
                      scope="col"
                      class="px-1 py-3"
                    >
                      <div v-if="column.image">
                        <slot :name="column.key + '-header'" :column="column">
                          <div class="flex-center">
                            <span class="me-2">{{ column.key }}</span>
                            <Icon
                              size="20"
                              name="material-symbols:add-a-photo"
                            />
                          </div>
                        </slot>
                      </div>
                      <slot
                        v-else
                        :name="column.key + '-header'"
                        :column="column"
                      >
                        <div class="flex-center">
                          {{ column.label }}
                        </div>
                      </slot>
                    </th>

                    <!-- Actions -->
                    <th scope="col" class="px-6 py-3">
                      <div class="flex-center">
                        {{ $t("table.actions") }}
                      </div>
                    </th>
                  </tr>
                </thead>
                <draggable
                  v-model="rows"
                  item-key="id"
                  tag="tbody"
                  v-bind="dragOptions"
                  @end="onDragEnd"
                  :component-data="{
                    tag: 'tbody',
                    type: 'transition-group',
                  }"
                >
                  <template #item="{ element }">
                    <TableRow
                      :row="element"
                      :columns="columns"
                      :endpoint="endpoint"
                      :permissions="permissions"
                      :selectable="selectable"
                      @select="select"
                      @edit="
                        external_form
                          ? navigateTo(`/${endpoint}/form/${element.id}`)
                          : editItem(element)
                      "
                      @delete="
                        () => {
                          row_id_to_delete = element.id;
                          delete_row_dialog = true;
                        }
                      "
                      @show-image-modal="
                        () => {
                          current_image = element.image;
                          showImageModal = true;
                        }
                      "
                    >
                      <!-- Dynamic Slot -->
                      <template #dynamic-slot="{ row, column }">
                        <slot
                          :name="`${column.key}-data`"
                          :column="column"
                          :row="row"
                        >
                          <div class="flex-center">
                            {{ row[column.key] }}
                          </div>
                        </slot>
                      </template>
                    </TableRow>
                  </template>
                </draggable>
              </template>
            </template>
          </table>
        </div>

        <template #footer>
          <div class="flex justify-between items-center px-3 py-3.5">
            <p class="text-sm text-gray-500">
              {{
                $t("table.num_of_rows", {
                  from: (page - 1) * perPage + 1,
                  to: Math.min(page * perPage, totalRows),
                  total: totalRows,
                })
              }}
            </p>
            <UPagination
              v-model="page"
              :page-count="perPage"
              :total="totalRows"
            />
          </div>
        </template>
      </UCard>
    </UContainer>

    <!-- Add/Edit Row Modal -->
    <UModal v-model="edit_add_row_dialog">
      <TableForm
        :mode="edit_mode ? 'edit' : 'add'"
        :endpoint="endpoint"
        :title="
          edit_mode
            ? $t('form.edit') + ' ' + $t(`CRUDS.${endpoint}.single`)
            : $t('form.add') + ' ' + $t(`CRUDS.${endpoint}.single`)
        "
        :current_row="current_row"
        :inputs="inputs"
        @close="edit_add_row_dialog = false"
        @refresh="refresh"
      />
    </UModal>

    <!-- Delete Row Modal -->
    <UModal v-model="delete_row_dialog">
      <DeleteRow
        @close="delete_row_dialog = false"
        @delete="deleteRow"
        :delete_loading="delete_loading"
      />
    </UModal>

    <!-- Image Modal -->
    <UModal
      v-model="showImageModal"
      fullscreen
      :ui="{ base: 'max-h-full overflow-hidden' }"
    >
      <UButton
        color="primary"
        variant="solid"
        icon="i-heroicons-x-mark-20-solid"
        class="fixed top-4 right-4"
        @click="showImageModal = false"
      />
      <nuxt-img :src="current_image" class="max-w-full max-h-full" />
    </UModal>
  </div>
</template>
