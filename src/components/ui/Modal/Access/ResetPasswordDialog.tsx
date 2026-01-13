import { useMemo, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

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
      <DialogTitle>Reset password</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1, display: "grid", gap: 2 }}>
          <TextField
            label="Current password"
            type="password"
            size="small"
            value={form.currentPassword}
            onChange={setField("currentPassword")}
            autoFocus
          />

          <TextField
            label="New password"
            type="password"
            size="small"
            value={form.newPassword}
            onChange={setField("newPassword")}
          />

          <TextField
            label="Confirm new password"
            type="password"
            size="small"
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
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button sx={{ bgcolor: "var(--ubs-charcoal)", color: "white" }} onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="error" disabled={!canSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
