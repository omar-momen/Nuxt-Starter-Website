export const useUserStore = defineStore("user", () => {
  // Permissions
  const permissions = ref([
    // TEMP
    "contact-us",
  ]);
  const getUserPermissions = async () => {
    const { data, error, status } = await userService().getUserPermissions();
    permissions.value = data.value || [];
    return { data, error, status };
  };

  return {
    permissions,
    getUserPermissions,
  };
});
