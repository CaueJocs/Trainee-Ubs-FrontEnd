import { useMemo, useState } from "react";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useI18n } from "@/i18n/I18nContext";
import { Alert } from "@mui/material";

export type ResetPasswordForm = {
  newPassword: string;
  confirmNewPassword: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave?: (values: ResetPasswordForm) => void;
};

const EMPTY: ResetPasswordForm = {
  newPassword: "",
  confirmNewPassword: "",
};

export function ResetPasswordDialog({ open, onClose, onSave }: Props) {
  const { t } = useI18n();
  const [form, setForm] = useState<ResetPasswordForm>(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setForm(EMPTY);
    onClose();
  };

  const setField =
    (key: keyof ResetPasswordForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const passwordsMatch = useMemo(
    () => form.newPassword === form.confirmNewPassword,
    [form.newPassword, form.confirmNewPassword]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Block submission if passwords do not match
    if (!passwordsMatch) return;
    
    if (submitting) return;
    setSubmitting(true);
    try {
      onSave?.(form);
      handleClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>

      <Box sx={{
          p: 3,
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          gap: 3,
      }}>
        
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
        }}>

          <LockResetIcon sx={{ fontSize: 80 }} />
          <h1>Reset Password</h1>
        </Box>

        <Box
          component="form"
          id="reset-password-form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 900,
            mx: "auto",
            width: "100%",
            display: "grid",
            gap: 2,
            flexGrow: 1,
          }}
        >

          <TextField
            label="New password"
            type="password"
            size="medium"
            value={form.newPassword}
            onChange={setField("newPassword")}
            required
            slotProps={{
              htmlInput: {
                minLength: 8,
                maxLength: 64,
                pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).*$",
                title: t("access.passwordValidation"),
              }
            }}
          />

          <TextField
            label="Confirm new password"
            type="password"
            size="medium"
            value={form.confirmNewPassword}
            onChange={setField("confirmNewPassword")}
            required
          />
        </Box>

        {form.confirmNewPassword.length > 0 && !passwordsMatch && (
          <Alert icon={<ErrorOutlineIcon fontSize="medium" />} severity="warning" sx={{ mt: 1 }}>
            The passwords do not match.
          </Alert>
        )}
        
        <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 2 }}>
          <Button 
            sx={{ bgcolor: "var(--ubs-charcoal)", color: "white" }} 
            onClick={handleClose}
            type="button"
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button 
            sx={{ bgcolor: "var(--ubs-red)", color: "white" }} 
            type="submit"
            form="reset-password-form"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
