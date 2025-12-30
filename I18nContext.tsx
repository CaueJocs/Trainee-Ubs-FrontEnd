import * as React from "react";
import { LANGUAGES, translations, type Lang } from "./translations";

type TFn = (key: string) => string;

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TFn;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

function getNested(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

function detectDefaultLang(): Lang {
  const saved = localStorage.getItem("ubs-lang") as Lang | null;
  if (saved && LANGUAGES.some((l) => l.value === saved)) return saved;

  const browser = (navigator.language || "en").slice(0, 2) as Lang;
  if (LANGUAGES.some((l) => l.value === browser)) return browser;

  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(() => detectDefaultLang());

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem("ubs-lang", next);
  }, []);

  const t = React.useCallback<TFn>(
    (key) => {
      const value = getNested(translations[lang], key);
      return typeof value === "string" ? value : key;
    },
    [lang]
  );

  const value = React.useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
