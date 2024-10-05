export const staticService = () => {
  return {
    async getPrivacy() {
      const { data, error } = await useApi("member/general/privacy");

      if (error.value) {
        return toast.add({
          color: "red",
          id: "get_privacy_failed",
          title: getError(error.value),
        });
      }

      return data?.value?.data;
    },

    async getTerms() {
      const { data, error } = await useApi("member/general/term");

      if (error.value) {
        return toast.add({
          color: "red",
          id: "get_terms_failed",
          title: getError(error.value),
        });
      }
      return data?.value?.data;
    },

    async getFaqs() {
      const { data, error } = await useApi("member/general/faq");

      if (error.value) {
        return toast.add({
          color: "red",
          id: "get_faqs_failed",
          title: getError(error.value),
        });
      }
      return data?.value?.data;
    },
  };
};
