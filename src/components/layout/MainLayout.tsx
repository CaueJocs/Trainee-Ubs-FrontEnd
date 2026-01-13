import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UserProfileDialog } from "@/components/ui/Modal/Access/UserProfileDialog";
import { ResetPasswordDialog } from "@/components/ui/Modal/Access/ResetPasswordDialog";

export function MainLayout() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header
          variant="default"
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenResetPassword={() => setIsResetOpen(true)}
        />
        <main className="flex-1 bg-white">
          <Outlet />
        </main>
        <Footer />
      </div>

      <UserProfileDialog
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <ResetPasswordDialog
        open={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onSave={(v) => console.log(v)}
      />
    </>
  );
}