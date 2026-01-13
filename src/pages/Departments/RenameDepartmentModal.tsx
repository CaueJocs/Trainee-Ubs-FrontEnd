import { useEffect, useMemo, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import type { DepartmentRow } from "./Departments";

type Props = {
  open: boolean;
  department: DepartmentRow | null;
  onClose: () => void;
  onSave: (payload: { id: number; departmentName: string }) => void;
};

export function RenameDepartmentModal({ open, department, onClose, onSave }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open && department) setName(department.departmentName);
  }, [open, department]);

  const canSave = useMemo(() => Boolean(department) && Boolean(name.trim()), [department, name]);

  const handleSave = () => {
    if (!department) return;
    onSave({ id: department.id, departmentName: name.trim() });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Rename department</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1, display: "grid", gap: 2 }}>
          <TextField
            label="Department"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            autoFocus
          />

          <TextField
            label="Currency"
            value={department?.currency ?? ""}
            size="small"
            disabled
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="error" disabled={!canSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
