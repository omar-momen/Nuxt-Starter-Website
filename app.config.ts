export default defineAppConfig({
  ui: {
    primary: "Tprimary",
    gray: "neutral",

    input: {
      rounded: "rounded-xl",
      base: "min-w-36 h-14 ps-5 text-base font-normal text-darkColor dark:text-whiteColor",
      placeholder: "placeholder-darkColor dark:placeholder-whiteColor",
    },

    container: {
      padding: "lg:px-28",
      constrained: "max-w-[auto]",
    },

    slideover: {
      wrapper: "z-[9999]",
    },

    modal: {
      wrapper: "z-[999]",
      overlay: {
        background: "bg-[#1A1A1AAD] backdrop-blur-md",
      },
    },

    notifications: {
      wrapper: "z-[9999]",
    },

    button: {
      color: {
        primary: {
          solid:
            "rounded-2xl text-whiteColor bg-primary text-base font-semibold py-4 px-10 capitalize",
        },
      },
    },
  },
});
