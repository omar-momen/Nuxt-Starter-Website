export default () => {
  const { t } = useI18n();
  return [
    {
      title: t("links.home"),
      icon: "mdi:home",
      path: "/",
    },
    {
      title: t("links.tasks"),
      icon: "mdi:globe-model",
      path: "/tasks",
    },
  ];
};
