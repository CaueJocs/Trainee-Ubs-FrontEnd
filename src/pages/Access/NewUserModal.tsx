import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export type NewUserForm = {
  email: string;
  name: string;
  password: string;
  manager: string;
  area: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (mode: "save" | "saveAndCreate", values: NewUserForm) => void;
};

const EMPTY_FORM: NewUserForm = {
  email: "",
  name: "",
  password: "",
  manager: "",
  area: "",
};

export function NewUserModal({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<NewUserForm>(EMPTY_FORM);

  useEffect(() => {
    if (open) setForm(EMPTY_FORM);
  }, [open]);

  const setField =
    (key: keyof NewUserForm) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = (mode: "save" | "saveAndCreate") => {
    onSave(mode, form);

    if (mode === "save") onClose();
    if (mode === "saveAndCreate") setForm(EMPTY_FORM);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

      <DialogTitle>New user</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            mt: 1,
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          }}
        >
          <TextField
            label="User email"
            value={form.email}
            onChange={setField("email")}
            size="small"
          />

          <TextField
            label="User name"
            value={form.name}
            onChange={setField("name")}
            size="small"
          />

          <TextField
            label="User password"
            value={form.password}
            onChange={setField("password")}
            size="small"
            type="password"
          />

          <TextField
            label="User's manager"
            value={form.manager}
            onChange={setField("manager")}
            size="small"
          />

          <TextField
            label="User's Area"
            value={form.area}
            onChange={setField("area")}
            size="small"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button
          onClick={() => handleSave("save")}
          variant="contained"
          color="error"
        >
          Save
        </Button>

        <Button
          onClick={() => handleSave("saveAndCreate")}
          variant="contained"
          color="error"
        >
          Save and create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
