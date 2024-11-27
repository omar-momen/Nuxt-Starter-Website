<template>
  <div class="select-input">
    <USelectMenu
      v-model="model"
      :options="options"
      value-attribute="id"
      option-attribute="name"
      class="min-w-40"
      v-bind="attrs"
      :ui="{
        icon: {
          trailing: {
            pointer: '',
          },
        },
      }"
    >
      <!-- Clearable -->
      <template
        #trailing
        v-if="
          clearable && model && !(Array.isArray(model) && model.length == 0)
        "
      >
        <Icon
          @click="model = undefined"
          name="ic:round-clear"
          class="w-5 h-5 cursor-pointer"
        />
      </template>
    </USelectMenu>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  getEndpoint?: string;
  options?: any[];
  crud?: boolean;
  clearable?: boolean;
}>();

const attrs = useAttrs();

const options = ref<any[]>([]);
if (!props.getEndpoint) {
  options.value = props.options || [];
} else {
  const { data } = await useMyFetch(props.getEndpoint);
  options.value = data.value;
}

const model = defineModel<
  string | number | boolean | object | any[] | undefined
>({
  required: true,
});
</script>
