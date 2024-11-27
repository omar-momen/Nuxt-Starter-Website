export const settingsService = () => {
  return {
    async getSettings() {
      const { data, error, status } = await useMyFetch(
        `member/general/settings`
      );

      if (error.value) {
        toast.add({
          color: "red",
          id: "get_settings_failed",
          title: getError(error.value),
        });

        return { data: null, error, status };
      }

      return { data, error, status };
    },
  };
};
