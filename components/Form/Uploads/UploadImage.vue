<script lang="ts" setup>
const props = defineProps<{
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  accept?: string;
}>();

const model = defineModel({ default: {}, required: true });

const file = ref<{
  object: File | null;
  url: string | string;
}>({
  object: null,
  url: "",
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    model.value = target.files[0];
    file.value.object = target.files[0];
    file.value.url = URL.createObjectURL(target.files[0]);
  }
};
</script>

<template>
  <div class="flex-center">
    <label
      for="dropzone-file"
      class="h-60 w-80 flex-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 p-2"
    >
      <div
        v-if="!model"
        class="flex flex-col items-center justify-center pt-5 pb-6"
      >
        <UploadIcon />
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
      </div>
      <div v-else class="w-full h-full max-w-full max-h-full">
        <NuxtImg
          v-if="typeof model === 'string'"
          class="w-full h-full max-w-full max-h-full object-cover"
          width="300"
          height="300"
          :src="model"
          format="webp"
        />
        <NuxtImg
          v-else
          class="w-full h-full max-w-full max-h-full object-cover"
          width="300"
          height="300"
          :src="file.url"
          format="webp"
        />
      </div>

      <input
        id="dropzone-file"
        type="file"
        class="hidden"
        :accept="accept"
        @change="handleFileChange"
      />
    </label>
  </div>
</template>
