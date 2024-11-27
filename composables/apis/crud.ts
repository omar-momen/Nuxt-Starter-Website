export const crudService = () => {
  const nuxtApp = useNuxtApp();
  const toast = useToast();
  const locale = nuxtApp?.$i18n?.locale;

  return {
    async getTable<T>(url: string | (() => string), options = {}) {
      const { data, error, refresh, execute, status } = await useMyFetch<T>(
        url,
        options
      );

      if (error.value) {
        toast.add({
          color: "red",
          id: "get_table_failed",
          title: getError(error.value),
        });
        return { data: null, error, refresh, execute, status };
      }

      return { data, error, refresh, execute, status };
    },

    async exportTable(
      url: string,
      params = {},
      filename = "download",
      ext = "xlsx"
    ) {
      const { data, error, status } = await useMyFetch<Response>(url, {
        method: "GET",
        params,
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "export_table_failed",
          title: getError(error.value),
        });
        return { data: null, error };
      }

      // Convert the response to a Blob manually
      try {
        const blob = await data.value?.blob();
        if (blob) {
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = `${filename}.${ext}`;
          a.click();
          window.URL.revokeObjectURL(downloadUrl);
        }
      } catch (err) {
        toast.add({
          color: "red",
          id: "export_table_failed",
          title: getError(err),
        });
        return { data: null, error: err, status };
      }

      return { data, error, status };
    },

    async getRow(url: any, id: any) {
      const { data, error, status } = await useMyFetch(`${url}/${id}`);

      if (error.value) {
        toast.add({
          color: "red",
          id: "get_row_failed",
          title: getError(error.value),
        });
        return { data: null, error, status };
      }

      return { data, error, status };
    },

    async createRow(url: string, row_data: FormData) {
      row_data.append("_method", "POST");
      const { data, error, loading } = await useDollarFetch(url, {
        method: "POST",
        body: JSON.stringify(row_data),
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "create_row_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
      }

      const message =
        locale.value === "en"
          ? "Row added successfully"
          : "تمت إضافة الصف بنجاح";
      toast.add({
        color: "green",
        id: "add_success",
        title: message,
      });

      return { data, error, loading };
    },

    async updateRow(url: string, row_data: FormData) {
      const { data, error, loading } = await useDollarFetch(url, {
        method: "POST",
        body: row_data,
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "update_row_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
      }

      const message =
        locale.value === "en"
          ? "Row updated successfully"
          : "تم تحديث الصف بنجاح";
      toast.add({
        color: "green",
        id: "edit_success",
        title: message,
      });

      return { data, error, loading };
    },

    async deleteRow(url: string, id: number | null | undefined) {
      const { data, error, loading } = await useDollarFetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "delete_row_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
      }

      const message =
        locale.value === "en"
          ? "Row deleted successfully"
          : "تم حذف الصف بنجاح";
      toast.add({
        color: "green",
        id: "delete_success",
        title: message,
      });

      return { data, error, loading };
    },

    async reOrderRow(url: string, row_data: any) {
      const { data, error, loading } = await useDollarFetch(url, {
        method: "POST",
        body: row_data,
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "reorder_row_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
      }

      const message =
        locale.value === "en"
          ? "Row reordered successfully"
          : "تم إعادة ترتيب الصف بنجاح";
      toast.add({
        color: "green",
        id: "reorder_success",
        title: message,
      });

      return { data, error, loading };
    },
  };
};
