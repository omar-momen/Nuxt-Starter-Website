export const userService = () => {
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp?.$i18n?.locale;
  const $dollarfetch = nuxtApp.$dollarfetch;

  return {
    async getProfile() {
      const { data, error } = await useApi("member/profile", {
        method: "GET",
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "get_profile_failed",
          title: getError(error.value),
        });
      }

      return data?.value?.data;
    },

    async editProfile(type, profileData) {
      try {
        data = await $dollarfetch(`member/profile/upload-${type}`, {
          method: "POST",
          body: profileData,
        });
      } catch (error) {
        toast.add({
          color: "red",
          id: "edit_profile_failed",
          title: getError(error),
        });
        return 0;
      }

      const message =
        locale.value == "en"
          ? "Profile updated successfully"
          : "تم تحديث البيانات بنجاح";
      toast.add({
        color: "green",
        id: "edit_profile_success",
        title: message,
      });

      return data?.value?.data;
    },

    async uplodeProfileImage(image) {
      const { data, error } = await useApi(`member/profile/upload-image`, {
        method: "POST",
        body: image,
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "upload_image_failed",
          title: getError(error.value),
        });
      }

      const message =
        locale.value == "en"
          ? "Image uploaded successfully"
          : "تم رفع الصورة بنجاح";
      toast.add({
        color: "green",
        id: "upload_image_success",
        title: message,
      });

      return data?.value?.data;
    },

    async deleteProfileImage() {
      const { data, error } = await useApi(`member/profile/delete-image`, {
        method: "POST",
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "delete_image_failed",
          title: getError(error.value),
        });
      }
      const message =
        locale.value == "en"
          ? "Image deleted successfully"
          : "تم حذف الصورة بنجاح";
      toast.add({
        color: "green",
        id: "delete_image_success",
        title: message,
      });

      return data?.value?.data;
    },

    async getUserPermissions() {
      const { data, error } = await useApi("member/auth/permissions", {
        method: "GET",
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "password_reset_failed",
          title: getError(error.value),
        });
      }
      return data?.value?.data;
    },
  };
};
