import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/I18nContext";
import { ModalProvider } from "@/components/ui/Modal/ModalProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ModalProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </ModalProvider>
    </I18nProvider>
  </StrictMode>
);
