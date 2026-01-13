import { useMemo, useState } from "react";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import { DialogTitle } from "@mui/material";

export type ResetPasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave?: (values: ResetPasswordForm) => void; // opcional (por enquanto pode só logar)
};

const EMPTY: ResetPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export function ResetPasswordDialog({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<ResetPasswordForm>(EMPTY);

  const handleClose = () => {
    setForm(EMPTY);
    onClose();
  };

  const setField =
    (key: keyof ResetPasswordForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const passwordsMatch = useMemo(
    () => form.newPassword.length > 0 && form.newPassword === form.confirmNewPassword,
    [form.newPassword, form.confirmNewPassword]
  );

  const canSave = useMemo(() => {
    return (
      form.currentPassword.trim().length > 0 &&
      form.newPassword.trim().length > 0 &&
      form.confirmNewPassword.trim().length > 0 &&
      passwordsMatch
    );
  }, [form, passwordsMatch]);

  const handleSave = () => {
    if (!canSave) return;
    onSave?.(form);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>

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
          <LockResetIcon sx={{ fontSize: 80 }} />
          <h1>Reset Password</h1>
        </Box>

        
        <Box
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
            label="Current password"
            type="password"
            size="medium"
            value={form.currentPassword}
            onChange={setField("currentPassword")}
            autoFocus
          />

          <TextField
            label="New password"
            type="password"
            size="medium"
            value={form.newPassword}
            onChange={setField("newPassword")}
          />

          <TextField
            label="Confirm new password"
            type="password"
            size="medium"
            value={form.confirmNewPassword}
            onChange={setField("confirmNewPassword")}
            error={form.confirmNewPassword.length > 0 && !passwordsMatch}
            helperText={
              form.confirmNewPassword.length > 0 && !passwordsMatch
                ? "Passwords do not match"
                : " "
            }
          />
        </Box>

        
        <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 2 }}>
          <Button sx={{ bgcolor: "var(--ubs-charcoal)", color: "white" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ bgcolor: "var(--ubs-red)", color: "white" }} onClick={handleSave} disabled={!canSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
