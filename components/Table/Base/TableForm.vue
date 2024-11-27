<template>
  <div class="add/edit-form">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <div class="flex items-center justify-between border-b pb-5">
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          {{ title }}
        </h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="$emit('close')"
        />
      </div>

      <UForm
        class="space-y-4 pt-5"
        :state="state"
        :validate="validate"
        @submit="saveRow"
        @error="onError"
      >
        <div v-for="input in inputs" :key="input.key">
          <!-- Image -->
          <UFormGroup
            v-if="input.type == 'file-image'"
            :label="input.label"
            :name="input.key"
          >
            <UploadImage
              v-model="state[input.key]"
              accept="image/*"
              label="Upload Image"
            />
          </UFormGroup>
          <!-- Text -->
          <UFormGroup
            v-if="input.type == 'text'"
            :label="input.label"
            :name="input.key"
          >
            <UInput
              :placeholder="input.placeholder"
              v-model="state[input.key]"
              type="text"
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
          <!-- Textarea -->
          <UFormGroup
            v-if="input.type == 'textarea'"
            :label="input.label"
            :name="input.key"
          >
            <UTextarea
              :placeholder="input.placeholder"
              v-model="state[input.key]"
            />
          </UFormGroup>
          <!-- Switch -->
          <UFormGroup
            v-if="input.type == 'switch'"
            :label="input.label"
            :name="input.key"
          >
            <UToggle v-model="state[input.key]" />
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
            />
            <SelectInput
              v-else
              v-model="state[input.key]"
              :options="input.options"
              :multiple="input.multiple"
              :placeholder="input.placeholder"
            />
          </UFormGroup>
        </div>

        <div class="flex items-center justify-cebter pt-5">
          <UButton
            :loading="save_row_loading"
            :label="t('form.save')"
            type="submit"
            class="transition-all duration-500"
          />
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  mode: string;
  title: string;
  endpoint: string;
  inputs: any;
  current_row: any;
}>();

const emit = defineEmits(["close", "refresh"]);

// =====> Globals
// const nuxtApp = useNuxtApp();
const { t } = useI18n();
// const toast = useToast();
const crud_service = crudService();

// ====== State
const state = reactive<Record<string, any>>({});
props.inputs.forEach((input: any) => {
  if (props.mode == "edit") {
    state[input.key] = input.val;
  } else {
    if (input.multiple) {
      state[input.key] = [];
    } else {
      state[input.key] = "";
    }
  }
});

// ======= Validate
const validate = (state: any) => {
  const errors: { path: any; message: string }[] = [];

  props.inputs.forEach((input: any) => {
    if (input.validations?.length > 0) {
      input.validations.forEach((validation: any) => {
        if (!validation.valid(state[input.key])) {
          errors.push({
            path: input.key,
            message: validation.message,
          });
        }
      });
    }
  });

  // if (input.required && !state[input.key]) {
  //   errors.push({
  //     path: input.key,
  //     message: `${input.label} ${t("validation.is_required")}`,
  //   });
  // }

  return errors;
};

// ====== Save Row
const save_row_loading = ref(false);
const saveRow = async () => {
  save_row_loading.value = true;

  const form_data = new FormData();
  for (const key in state) {
    form_data.append(key, state[key]);
  }

  // =====> Edit Row
  if (props.mode == "edit") {
    await crud_service.updateRow(
      `${props.endpoint}/${props.current_row?.id}`,
      form_data
    );

    // =====> Update Table
    emit("refresh");
  }
  // =====> Add Row
  else {
    await crud_service.createRow(props.endpoint, form_data);

    // =====> Update Table
    emit("refresh");
  }

  save_row_loading.value = false;
  emit("close");
};

// ====== Handle Errors
async function onError(event: { errors: { id: string }[] }) {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}
</script>
