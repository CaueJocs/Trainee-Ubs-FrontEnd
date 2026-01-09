import { useI18n } from "@/i18n/I18nContext";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px bg-black/10" />
        <p className="mt-4 text-sm text-muted-foreground">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
