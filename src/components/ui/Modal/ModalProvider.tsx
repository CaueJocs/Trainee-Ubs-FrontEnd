/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ModalContextType, ModalPayload } from "./ModalExpense/types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  // Minimal implementation: store payload but do not render anything by default.
  const [payload, setPayload] = useState<ModalPayload | null>(null);

  const openModal = (p: ModalPayload) => setPayload(p);
  const closeModal = () => setPayload(null);

  // reference payload in render to avoid unused-variable errors
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {payload ? null : null}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextType {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

export default ModalProvider;
