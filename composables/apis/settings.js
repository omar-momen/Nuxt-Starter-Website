export const settingsService = () => {
  return {
    async getSettings() {
      const { data, error } = await useApi(`member/general/settings`);

      if (error.value) {
        return toast.add({
          color: "red",
          id: "get_settings_failed",
          title: getError(error.value),
        });
      }

      return data?.value?.data;
    },
  };
};
