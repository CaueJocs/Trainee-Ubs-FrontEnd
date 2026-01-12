import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export type AccessRow = {
  id: number;
  name: string;
  email: string;
  manager: string;
  area: string;
};

type Props = {
  open: boolean;
  user: AccessRow | null;
  onClose: () => void;
  onSave: (updated: AccessRow) => void;
};

export function EditUserDialog({ open, user, onClose, onSave }: Props) {
  const [form, setForm] = useState<AccessRow | null>(null);

  useEffect(() => {
    if (open && user) setForm(user);
  }, [open, user]);

  const isReady = useMemo(() => Boolean(form), [form]);

  const setField =
    (key: keyof AccessRow) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!form) return;
      const value = key === "id" ? Number(e.target.value) : e.target.value;
      setForm({ ...form, [key]: value as any });
    };

  const handleSave = () => {
    if (!form) return;
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

      <DialogTitle>Edit user</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            mt: 1,
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          }}
        >
          <TextField
            label="Id"
            value={form?.id ?? ""}
            onChange={setField("id")}
            size="small"
            type="number"
          />

          <TextField
            label="Name"
            value={form?.name ?? ""}
            onChange={setField("name")}
            size="small"
          />

          <TextField
            label="Email"
            value={form?.email ?? ""}
            onChange={setField("email")}
            size="small"
          />

          <TextField
            label="Manager"
            value={form?.manager ?? ""}
            onChange={setField("manager")}
            size="small"
          />

          <TextField
            label="Area"
            value={form?.area ?? ""}
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
          onClick={handleSave}
          variant="contained"
          color="error"
          disabled={!isReady}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
