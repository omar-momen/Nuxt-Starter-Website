export const useValidation = () => {
  return {
    isEmail: (value: string) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(value);
    },
    isPassword: (value: string) => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return passwordRegex.test(value);
    },
    isRequired: (value: string) => {
      return value.trim() !== "";
    },
  };
};
