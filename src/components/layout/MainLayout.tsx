import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UserProfileDialog } from "@/components/ui/Modal/Access/UserProfileDialog";
import { ResetPasswordDialog } from "@/components/ui/Modal/Access/ResetPasswordDialog";

export function MainLayout() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

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
        onShowSnackbar={showSnackbar}
      />

      <ResetPasswordDialog
        open={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onSave={(v) => {
          console.log(v);
          showSnackbar("Password reset successfully", "success");
        }}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={(_: React.SyntheticEvent | Event, reason?: string) => {
          if (reason === "clickaway") return;
          setSnackOpen(false);
        }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}