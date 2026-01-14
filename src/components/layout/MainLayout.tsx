import { Outlet } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="default" />
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}