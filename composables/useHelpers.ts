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

    hasPermission: (permission: any[], mustHavAllListedPermisiions = false) => {
      if (typeof permission === "string") {
        return useUserStore().permissions.includes(permission);
      } else if (typeof permission === "object") {
        if (mustHavAllListedPermisiions) {
          return permission.every((p) =>
            useUserStore().permissions.includes(p)
          );
        } else {
          return permission.some((p) => useUserStore().permissions.includes(p));
        }
      }
    },
  };
};
