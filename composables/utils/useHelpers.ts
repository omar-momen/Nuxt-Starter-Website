export const useHelpers = () => {
  return {
    debounce: (func: any, wait = 100) => {
      let timeout: string | number | NodeJS.Timeout | undefined;
      return function (...args: any) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },
    throttle: (func: any, limit = 100) => {
      let lastFunc: string | number | NodeJS.Timeout | undefined;
      let lastRan: number;
      return function (...args: any) {
        if (!lastRan) {
          func.apply(this, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
            if (Date.now() - lastRan >= limit) {
              func.apply(this, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    },

    capitalizeEveryWord: (str: string) => {
      return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
    },

    hasPermission: (permission: string) => {
      const userPermissions: string[] = useUserStore().permissions;
      return userPermissions.includes(permission);
    },
    hasAnyPermission: (permissions: string[]) => {
      const userPermissions: string[] = useUserStore().permissions;
      return permissions.some((permission) =>
        userPermissions.includes(permission)
      );
    },
  };
};
