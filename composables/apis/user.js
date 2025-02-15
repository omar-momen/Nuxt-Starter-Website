export const userService = () => {
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp?.$i18n?.locale;

  return {
    async getProfile() {
      const { data, error, status } = await useMyFetch("member/profile", {
        method: "GET",
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "get_profile_failed",
          title: getError(error.value),
        });
        return { data: null, error, status };
      }

      return { data, error, status };
    },

    async editProfile(type, profileData) {
      const { data, error, loading } = await useDollarFetch(
        `member/profile/upload-${type}`,
        {
          method: "POST",
          body: profileData,
        }
      );

      if (error.value) {
        toast.add({
          color: "red",
          id: "edit_profile_failed",
          title: getError(error),
        });
        return { data: null, error, loading };
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

      return { data, error, loading };
    },

    async uplodeProfileImage(image) {
      const { data, error, loading } = await useDollarFetch(
        `member/profile/upload-image`,
        {
          method: "POST",
          body: image,
        }
      );

      if (error.value) {
        toast.add({
          color: "red",
          id: "upload_image_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
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

      return { data, error, loading };
    },

    async deleteProfileImage() {
      const { data, error, loading } = await useDollarFetch(
        `member/profile/delete-image`,
        {
          method: "DELETE",
        }
      );

      if (error.value) {
        toast.add({
          color: "red",
          id: "delete_image_failed",
          title: getError(error.value),
        });
        return { data: null, error, loading };
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

      return { data, error, loading };
    },

    async getUserPermissions() {
      const { data, error, status } = await useMyFetch(
        "member/auth/permissions",
        {
          method: "GET",
        }
      );

      if (error.value) {
        toast.add({
          color: "red",
          id: "password_reset_failed",
          title: getError(error.value),
        });
        return { data: null, error, status };
      }
      return { data, error, status };
    },
  };
};
