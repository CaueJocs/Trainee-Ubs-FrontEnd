import Dialog from "@mui/material/Dialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Button } from "@mui/material";
import type { AlertColor } from "@mui/material";

import { useState } from "react";

import { ResetPasswordDialog, type ResetPasswordForm } from "./ResetPasswordDialog";
import { AuthService } from "@/services/AuthService";
import { useI18n } from "@/i18n/I18nContext";


type Props = {
  open: boolean;
  onClose: () => void;
  onShowSnackbar: (message: string, severity: AlertColor) => void;
};

export function UserProfileDialog({ open, onClose, onShowSnackbar }: Props) {
  const { t } = useI18n();
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  
  const user = AuthService.getUser();
  
  function handleResetPassword() {
    setResetPasswordOpen(true);
  }

  async function handleSavePassword(values: ResetPasswordForm): Promise<boolean> {
    const success = await AuthService.changePassword(values.currentPassword, values.newPassword);

    if (success) {
      onShowSnackbar(t("resetPassword.success"), "success");
      return true;
    } else {
      onShowSnackbar(t("resetPassword.error"), "error");
      return false;
    }
  }
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box
        sx={{
          p: 3,
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 80 }} />
          <h1>{t("profile.title")}</h1>
        </Box>

        
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            width: "100%",
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            flexGrow: 1,
          }}
        >
          <TextField
            label={t("profile.name")}
            value={user?.name || ""}
            size="medium"
            disabled
          />
          <TextField
            label={t("profile.email")}
            value={user?.email || ""}
            size="medium"
            disabled
          />
          <TextField
            label={t("profile.department")}
            value={user?.departmentName || ""}
            size="medium"
            disabled
          />
          <TextField
            label={t("profile.role")}
            value={user?.role || ""}
            size="medium"
            disabled
          />
        </Box>

        
        <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 2 }}>
          <Button sx={{ bgcolor: "var(--ubs-charcoal)", color: "white" }} onClick={onClose}>{t("profile.cancel")}</Button>
          <Button sx={{ bgcolor: "var(--ubs-red)", color: "white" }} endIcon={<LockResetIcon />} onClick={handleResetPassword}>{t("profile.resetPasswordButton")}</Button>
        </Box>
      </Box>

      {resetPasswordOpen && (
        <ResetPasswordDialog
          open={resetPasswordOpen}
          onClose={() => setResetPasswordOpen(false)}
          onSave={handleSavePassword}
        />
      )}
                
    </Dialog>
  );
}
