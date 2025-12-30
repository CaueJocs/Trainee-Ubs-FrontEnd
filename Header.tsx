import ubsLogo from "@/assets/images/ubs-logo.svg";
import { LanguageDropdown } from "@/components/layout/LanguageDropdown";

export function Header() {
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
