<template>
  <table class="skelton-table">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 block"
    >
      <tr class="flex *:flex-grow">
        <!-- Select Box -->
        <th v-if="selectable" scope="col" class="p-4">
          <div class="flex items-center">
            <USkeleton class="h-4 w-4" />
          </div>
        </th>

        <!-- Rest of the columns -->
        <th
          v-for="column in columns"
          :key="column.key"
          scope="col"
          class="px-1 py-3"
        >
          <div class="flex-center">
            <USkeleton class="min-w-16 h-4" />
          </div>
        </th>

        <!-- Actions -->
        <th scope="col" class="px-6 py-3">
          <div class="flex-center">
            <USkeleton />
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="block">
      <tr v-for="row in rows" class="flex *:flex-grow">
        <!-- Select Box -->
        <th v-if="selectable" scope="col" class="p-4">
          <div class="flex items-center">
            <USkeleton class="h-4 w-4" />
          </div>
        </th>

        <!-- Rest of the cells with column key -->
        <td v-for="column in columns" :key="column.key" class="px-6 py-4">
          <div>
            <div class="flex-center">
              <USkeleton class="min-w-16 h-4" />
            </div>
          </div>
        </td>

        <!-- Actions -->
        <th scope="col" class="px-6 py-3">
          <div class="flex-center gap-5">
            <USkeleton class="w-8 h-8" />
            <USkeleton class="w-8 h-8" />
          </div>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
defineProps<{
  columns: any[];
  selectable: boolean;
  rows: any[];
}>();
</script>
