import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { I18nProvider } from "@/i18n/I18nContext.tsx";
import { ModalProvider } from "@/components/ui/Modal/ModalProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ModalProvider>
          <App />
      </ModalProvider>
    </I18nProvider>
  </StrictMode>
);
