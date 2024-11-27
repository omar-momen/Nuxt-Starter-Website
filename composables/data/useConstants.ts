export function useConstants() {
  const { t } = useI18n();

  const GENDERS_OPTIONS = [
    { id: 1, name: t("labels.male") },
    { id: 2, name: t("labels.female") },
  ];

  const PER_PAGE_OPTIONS = [
    { id: 10, name: "10" },
    { id: 20, name: "20" },
    { id: 30, name: "30" },
  ];

  const PER_PAGE_DEFAULT = 10;

  return {
    GENDERS_OPTIONS,
    PER_PAGE_OPTIONS,
    PER_PAGE_DEFAULT,
  };
}
