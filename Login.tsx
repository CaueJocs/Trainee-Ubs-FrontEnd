import * as React from "react";
import { Info } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useI18n } from "@/i18n/I18nContext";

type GreetingKey = "morning" | "afternoon" | "evening" | "night";

function getGreetingKey(date = new Date()): GreetingKey {
  const h = date.getHours();

  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "afternoon";
  if (h >= 18 && h < 22) return "evening";
  return "night";
}

export default function Login() {
  const { t } = useI18n();

  // calcula 1x quando abre a página
  const greetingKey = React.useMemo(() => getGreetingKey(), []);
const greeting = t(`login.greeting.${greetingKey}`);


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbf1f2] via-[#f7dfe1] to-[#f3cfd2]">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-56px-220px)] max-w-6xl items-center justify-center px-4">
        <div className="w-full max-w-[520px] rounded-md bg-white px-10 pb-10 pt-12 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
          <div className="text-center">
            <h1 className="text-6xl font-light tracking-tight">{greeting}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("login.subtitle")}
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {/* Contract number + tooltip */}
            <div className="relative">
              <input
                className="h-12 w-full rounded-[3px] border border-neutral-800/70 px-4 pr-12 text-base outline-none focus:border-neutral-800"
                placeholder={t("login.contractPlaceholder")}
              />

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-neutral-900"
                    aria-label="Info"
                  >
                    <Info className="h-5 w-5" />
                  </button>
                </TooltipTrigger>

                <TooltipContent
                  side="right"
                  align="center"
                  sideOffset={12}
                  className="w-[320px] rounded-md border border-black/10 bg-white p-4 text-sm text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                >
                  {t("login.contractInfo")}
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 text-base">
              <input
                type="checkbox"
                className="h-5 w-5 rounded-[2px] border border-neutral-700 accent-neutral-800"
              />
              {t("login.rememberMe")}
            </label>

            {/* Continue */}
            <button
              type="button"
              className="h-14 w-full rounded-[3px] bg-neutral-700 text-base font-semibold text-white hover:bg-neutral-800"
            >
              {t("login.continue")}
            </button>

            {/* How to log in */}
            <button
              type="button"
              className="mx-auto flex items-center gap-2 text-base font-semibold hover:underline"
            >
              <span className="text-red-600">›</span>
              {t("login.howToLogin")}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
