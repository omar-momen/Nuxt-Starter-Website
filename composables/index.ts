// ================ this file enables auto import for nested files ================

// APIS
export { authService } from "./apis/auth.js";
export { crudService } from "./apis/crud";
export { lookupsService } from "./apis/lookups.js";
export { settingsService } from "./apis/settings.js";
export { userService } from "./apis/user.js";

// HOOKS
export { useMyFetch } from "./hooks/useMyFetch";
export { useDollarFetch } from "./hooks/useDollarFetch";

// DATA
export { useConstants } from "./data/useConstants";

// VALIDATIONS
export { getError } from "./validations/getError";

// HELPERS
export { useHelpers } from "./helpers/useHelpers.js";
export { useValidation } from "./helpers/useValidation.js";
