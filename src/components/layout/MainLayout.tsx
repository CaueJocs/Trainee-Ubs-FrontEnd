import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UserProfileDialog } from "@/components/ui/Modal/Access/UserProfileDialog";
import { ResetPasswordDialog, type ResetPasswordForm } from "@/components/ui/Modal/Access/ResetPasswordDialog";
import { AuthService } from "@/services/AuthService";
import { useI18n } from "@/i18n/I18nContext";

export function MainLayout() {
  const { t } = useI18n();
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

  const handleResetPassword = async (values: ResetPasswordForm): Promise<boolean> => {
    const success = await AuthService.changePassword(values.currentPassword, values.newPassword);

    if (success) {
      showSnackbar(t("resetPassword.success"), "success");
      return true;
    } else {
      showSnackbar(t("resetPassword.error"), "error");
      return false;
    }
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
        onSave={handleResetPassword}
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