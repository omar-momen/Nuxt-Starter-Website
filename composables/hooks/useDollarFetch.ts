import { ref, type Ref } from "vue";
import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";
import { useNuxtApp } from "#app";

export const useDollarFetch = async <T>(url: string, options?: RequestInit) => {
  const nuxtApp = useNuxtApp();
  const $dollarfetch = nuxtApp.$dollarfetch;

  const data: Ref<T | null> = ref(null);
  const error: Ref<unknown | null> = ref(null);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      data.value = await $dollarfetch<T>(
        url,
        options as NitroFetchOptions<NitroFetchRequest>
      );
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const refresh = async () => {
    await fetchData();
  };

  // Fetch data on initialization
  await fetchData();

  return { data, error, loading, refresh };
};
