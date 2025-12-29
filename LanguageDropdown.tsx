import { Globe, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "it", label: "Italiano" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
] as const;

type LangValue = (typeof LANGUAGES)[number]["value"];

export function LanguageDropdown() {
  const { lang, setLang } = useI18n();

  const current =
    LANGUAGES.find((l) => l.value === (lang as LangValue))?.label ?? "English";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="
            h-9 rounded-[3px]
            bg-neutral-800 text-white
            px-3
            flex items-center gap-2
            text-sm font-semibold
            shadow-sm
            hover:bg-neutral-900
            focus:outline-none focus:ring-0
          "
        >
          <Globe className="h-4 w-4 opacity-90" />
          <span>{current}</span>
          <ChevronDown className="h-4 w-4 opacity-90" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={10}
        className="
          w-[380px]
          rounded-[3px]
          bg-white
          p-2
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]
          border border-black/10
        "
      >
        {LANGUAGES.map((item) => {
          const selected = item.value === lang;

          return (
            <DropdownMenuItem
              key={item.value}
              onSelect={() => setLang(item.value)}
              className={`
                cursor-pointer
                px-6 py-4
                text-[18px] leading-none
                rounded-[2px]
                focus:bg-neutral-200
                ${selected ? "bg-neutral-200" : "hover:bg-neutral-100"}
              `}
            >
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
