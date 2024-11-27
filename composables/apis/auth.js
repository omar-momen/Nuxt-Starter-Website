export const authService = () => {
  const nuxtApp = useNuxtApp();

  const locale = nuxtApp?.$i18n?.locale;
  const toast = useToast();

  return {
    async login(loginData) {
      const { data, error, loading } = await useDollarFetch(
        "member/auth/login",
        {
          method: "POST",
          body: loginData,
        }
      );

      if (error.value) {
        toast.add({
          color: "red",
          id: "login_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
      }

      const message = locale.value == "en" ? "Welcome back" : "مرحبا بك";
      toast.add({
        color: "green",
        id: "login_success",
        title: message,
      });

      return { data: data, error, loading };
    },

    async logout() {
      const { data, error } = await useDollarFetch("member/auth/logout", {
        method: "POST",
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "logout_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
      }

      const message =
        locale.value == "en"
          ? "You have been logged out successfully"
          : "تم تسجيل الخروج بنجاح";
      toast.add({
        color: "green",
        id: "logout_success",
        title: message,
      });

      return { data: data, error, loading };
    },
  };
};
