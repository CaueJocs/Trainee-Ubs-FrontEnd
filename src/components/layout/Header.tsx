import ubsLogo from "@/assets/images/ubs-logo.svg";
import userIcon from "@/assets/images/user-icon.png";
import bellIcon from "@/assets/images/bell-icon.png";

import { LanguageDropdown } from "@/components/layout/LanguageDropdown";

export function Header({ variant = "default" }) {
  if (variant === "login") {
    return (
      <header className="h-14 border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <img src={ubsLogo} alt="UBS" className="h-6 w-auto" draggable={false} />
            <span className="text-lg font-medium">Connect</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Switzerland</span>
            <LanguageDropdown />
          </div>
        </div>
      </header>
    );
  }
  else {
    return (
      <header className="border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col px-6">

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
              <a className="cursor-pointer hover:text-black" href="#">Access</a>
              <a className="cursor-pointer hover:text-black" href="#">Expenses</a>
              <a className="cursor-pointer hover:text-black" href="#">Approvals</a>
            </nav>
          </div>

        </div>

        <div className="h-px bg-black/15" />
      </header>

    )
  }
}
