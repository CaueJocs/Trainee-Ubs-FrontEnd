import ubsLogo from "@/assets/images/ubs-logo.svg";
import userIcon from "@/assets/images/user-icon.png";
import bellIcon from "@/assets/images/bell-icon.png";

import { LanguageDropdown } from "@/components/layout/LanguageDropdown";

type HeaderVariant = "default" | "login";

export function Header({ variant = "default" }: { variant?: HeaderVariant }) {
  if (variant === "login") {
    return (
      <header className="border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          {/* Left */}
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={ubsLogo}
              alt="UBS"
              className="h-6 w-auto"
              draggable={false}
            />

            {/* Em telas pequenas, esconde o texto (fica só o logo) */}
            <span className="hidden text-lg font-medium sm:inline">
              ExpenseManager
            </span>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-4">
            <LanguageDropdown />
          </div>
        </div>

        <div className="h-px bg-black/15" />
      </header>
    );
  }

  return (
    <header className="border-t bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6">
        {/* Linha 1: logo + ícones */}
        <div className="flex h-14 items-center justify-between">
          <a href="#">
            <img
              src={ubsLogo}
              alt="UBS"
              className="h-8 w-auto cursor-pointer opacity-100 hover:opacity-70"
              draggable={false}
            />
          </a>

          <div className="flex items-center gap-4">
            <img
              src={bellIcon}
              alt="bell"
              className="h-7 w-7 cursor-pointer opacity-70 hover:opacity-100"
              draggable={false}
            />
            <img
              src={userIcon}
              alt="user"
              className="h-7 w-7 cursor-pointer opacity-70 hover:opacity-100"
              draggable={false}
            />
          </div>
        </div>

        {/* Linha 2: menu */}
        <div className="flex h-10 items-center">
          <nav className="flex gap-6 text-base text-black/70">
            <a className="cursor-pointer hover:text-black" href="#">
              Access
            </a>
            <a className="cursor-pointer hover:text-black" href="#">
              Expenses
            </a>
            <a className="cursor-pointer hover:text-black" href="#">
              Approvals
            </a>
          </nav>
        </div>
      </div>

      <div className="h-px bg-black/15" />
    </header>
  );
}
