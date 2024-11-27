<template>
  <tr
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <!-- Select Box -->
    <td v-if="selectable" class="w-4 p-4">
      <div class="flex items-center">
        <UCheckbox @change="emit('select')" name="notifications" />
      </div>
    </td>

    <!-- Rest of the cells with column key -->
    <td v-for="column in columns" :key="column.key" class="px-6 py-4">
      <div v-if="column.image">
        <nuxt-img
          @click="emit('show-image-modal')"
          :src="row[column.key]"
          alt="image"
          class="w-10 h-10 rounded-full object-cover cursor-pointer"
          placeholder="https://via.placeholder.com/150"
        />
      </div>
      <div v-else-if="column.chips">
        <div class="flex-center gap-2">
          <div
            v-for="chip in row[column.key]"
            :key="chip"
            class="inline-block px-4 py-1 text-xs font-semibold text-white bg-gray-500 rounded-lg"
          >
            {{ chip }}
          </div>
        </div>
      </div>
      <div v-else-if="column.date">
        <div class="flex-center">
          {{ new Date(row[column.key]).toLocaleDateString() }}
        </div>
      </div>
      <div v-else-if="column.long_text">
        <UPopover mode="hover" :popper="{ placement: 'top-end' }">
          <div class="mx-auto">
            {{ row[column.key].slice(0, 20) + "..." }}
          </div>

          <template #panel>
            <div class="p-4">
              {{ row[column.key].slice(0, 50) }}
            </div>
          </template>
        </UPopover>
      </div>

      <div v-else>
        <slot name="dynamic-slot" :column="column" :row="row">
          <div class="flex-center">
            {{ row[column.key] }}
          </div>
        </slot>
      </div>
    </td>

    <!-- Actions -->
    <td>
      <div class="flex-center gap-3">
        <UButton
          :disabled="!useHelpers().hasPermission(permissions.update)"
          size="2xs"
          color="yellow"
          variant="outline"
          :ui="{ rounded: 'rounded-full' }"
          square
          @click.stop="emit('edit')"
        >
          <template #leading>
            <Icon name="material-symbols:edit" />
          </template>
        </UButton>
        <UButton
          :disabled="!useHelpers().hasPermission(permissions.delete)"
          size="2xs"
          color="red"
          variant="outline"
          :ui="{ rounded: 'rounded-full' }"
          square
          @click.stop="emit('delete')"
        >
          <template #leading>
            <Icon name="ic:baseline-delete" />
          </template>
        </UButton>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
defineProps<{
  row: any;
  columns: any[];
  selectable: boolean | undefined;
  permissions: any;
  endpoint: string;
}>();

const emit = defineEmits(["select", "show-image-modal", "edit", "delete"]);
</script>

<style></style>
