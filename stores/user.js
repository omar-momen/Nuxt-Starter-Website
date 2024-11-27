export const useUserStore = defineStore("user", () => {
  // Permissions
  const permissions = ref([
    // TEMP
    "tasks-create",
    "tasks-read",
    "tasks-update",
    "tasks-delete",
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
