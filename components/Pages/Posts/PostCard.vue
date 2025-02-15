<template>
  <div
    class="bg-whiteColor dark:bg-darkColor shadow-slate-300 dark:shadow-slate-800 p-5 rounded-lg shadow-md mb-4 transition duration-300"
  >
    <h3 class="text-lg font-semibold text-primary">
      {{ post.title }}
    </h3>
    <p class="text-sm">
      {{ post.description }}
    </p>
    <div class="flex justify-between border-t pt-0 mt-4 text-center">
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Created at: {{ new Date(post.created_at).toLocaleDateString() }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Updated at: {{ new Date(post.updated_at).toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  post: {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}>();
</script>
