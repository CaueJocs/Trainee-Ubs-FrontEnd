/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { LANGUAGES, translations, type Lang } from "./translations";

type TFn = (key: string) => string;

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TFn;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

function getNested(obj: any, path: string): string | undefined {
  return path.split(".").reduce<any>((acc, part) => acc?.[part], obj);
}

function detectDefaultLang(): Lang {
  const savedLanguage = localStorage.getItem("ubs-lang") as Lang | null;
  if (savedLanguage && LANGUAGES.some((l) => l.value === savedLanguage)) return savedLanguage;

  const browserLanguage = (navigator.language || "en").slice(0, 2) as Lang;
  if (LANGUAGES.some((l) => l.value === browserLanguage)) return browserLanguage;

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

/* eslint-disable react-refresh/only-export-components */
export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}