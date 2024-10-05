export const useAuthStore = defineStore("auth", () => {
  const is_first_visit = ref(false);

  const verify_code = ref(null);
  const verify_phone_value = ref(null);

  const user = ref(null);
  const token = useCookie("token");

  // ======== Handle First Load
  const handleFirstLoad = async () => {
    const localeUser = JSON.parse(localStorage.getItem("Blank_App_User"));
    if (!localeUser) return;
    user.value = localeUser;
  };

  // ======== Storage
  const setStorage = (userData) => {
    user.value = userData;
    token.value = userData.token;
    localStorage.setItem("Blank_App_User", JSON.stringify(userData));
    is_first_visit.value = userData.is_first_visit;
  };
  const clearStorage = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("Blank_App_User");
  };

  // ======== Verify Phone
  const verifyPhoneNumber = async (
    phone,
    forgetPass = false,
    resend = false
  ) => {
    const data = await authService().verifyPhoneNumber(
      phone,
      forgetPass,
      resend
    );
    verify_phone_value.value = phone;
    return data;
  };
  const confirmPhoneNumber = async (code, forgetPass = false) => {
    const data = await authService().confirmPhoneNumber(
      verify_phone_value.value,
      code,
      forgetPass
    );
    verify_code.value = code;
    return data;
  };

  // ======== Main Actions
  const logIn = async (loginData, fakeLogin = false) => {
    if (fakeLogin) {
      setStorage(loginData);
      return navigateTo("/");
    }

    const user = await authService().login(loginData);
    if (user) {
      setStorage(user);
      return navigateTo("/");
    }
    return user;
  };
  const forgetPassword = async (phone) => {
    const data = await authService().forgetPassword(phone);
    verify_phone_value.value = phone;
    return data;
  };
  const resetPassowrd = async (new_password) => {
    const data = await authService().resetPassowrd(
      verify_phone_value.value,
      verify_code.value,
      new_password
    );

    if (data) {
      // reset values
      verify_phone_value.value = null;
      verify_code.value = null;
    }

    return data;
  };

  const logOut = async (fakeLogin = false) => {
    if (fakeLogin) {
      clearStorage();
      return navigateTo("/authentication/login");
    }

    const data = await authService().logout();
    if (data) {
      clearStorage();
      return navigateTo("/authentication/login");
    }
  };

  const signup = async (signupData) => {
    const body = {
      ...signupData,
    };
    const user = await authService().signup(body);
    if (user) {
      // reset values
      verify_phone_value.value = null;
      verify_code.value = null;
    }
    return user;
  };

  return {
    verifyPhoneNumber,
    confirmPhoneNumber,

    logIn,
    forgetPassword,
    resetPassowrd,
    logOut,
    signup,

    user,
    is_first_visit,
    verify_phone_value,
    verify_code,

    handleFirstLoad,

    clearStorage,
    setStorage,
  };
});
