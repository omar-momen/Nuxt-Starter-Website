export const lookupsService = () => {
  const toast = useToast();

  return {
    async get_all_cats() {
      const { data, error, status } = await useMyFetch("get_all_cats", {
        method: "GET",
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "get_cat_failed",
          title: getError(error.value),
        });
        return { data: null, error, status };
      }

      return { data: data, error, status };
    },

    async get_sub_cat_properties(subCategoryId) {
      const { data, error, loading } = await useDollarFetch(
        "properties?cat=" + subCategoryId,
        {
          method: "GET",
        }
      );

      if (error.value) {
        toast.add({
          color: "red",
          id: "get_sub_cat_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
      }

      return { data: data, error, loading };
    },
  };
};
