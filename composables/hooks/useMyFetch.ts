import type { FetchError } from "ofetch";
import type { AsyncData } from "#app";
import { useNuxtApp } from "#app";

export function useMyFetch<T = any>(
  url: string | (() => string),
  options?: any
): AsyncData<T, FetchError> {
  return useFetch<T>(url, {
    ...options,
    $fetch: useNuxtApp().$dollarfetch,
  }) as AsyncData<T, FetchError>;
}
