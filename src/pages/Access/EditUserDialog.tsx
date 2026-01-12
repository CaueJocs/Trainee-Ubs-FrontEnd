import { startTransition, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import type { EmployeeRow } from "./Access";
import { MenuItem } from "@mui/material";
import { DepartmentService } from "@/services/DepartmentService";
import { EmployeeService } from "@/services/EmployeeService";

type Props = {
  open: boolean;
  user: EmployeeRow | null;
  onClose: () => void;
  onSave: (updated: EmployeeRow) => Promise<boolean>;
};


export function EditUserDialog({ open, user, onClose, onSave }: Props) {
  const [employee, setEmployee] = useState<EmployeeRow | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [managers, setManagers] = useState<{ id: string; name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      startTransition(() => setEmployee(user ?? null));
    } else {
      startTransition(() => setEmployee(null));
    }
  }, [open, user]);

  useEffect(() => {
    let cancelled = false;
    DepartmentService.getDepartments().then((list) => {
      if (cancelled) return;
      setDepartments(list.map((d) => d.name));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    EmployeeService.getAllManagers().then((list) => {
      if (cancelled) return;
      setManagers(list.map((m) => ({ id: m.id, name: m.name })));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isReady = useMemo(
    () => Boolean(
      employee?.name?.trim() && 
      employee?.email?.trim() && 
      employee?.departmentName?.trim() &&
      employee?.managerId?.trim() &&
      employee?.role &&
      employee?.position?.trim()
    ),
    [employee]
  );

  const setField =
    (key: keyof EmployeeRow) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!employee) return;
      setEmployee({ ...employee, [key]: e.target.value });
    };

  const handleSave = async () => {
    if (!employee || submitting) return;
    setSubmitting(true);
    try {
      const success = await onSave(employee);
      if (success) {
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
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
            label="Name"
            value={employee?.name ?? ""}
            onChange={setField("name")}
            size="small"
            required
          />

          <TextField
            label="Email"
            value={employee?.email ?? ""}
            onChange={setField("email")}
            size="small"
            required
          />
  
          <TextField
            select
            label="Manager"
            value={employee?.managerId ?? ""}
            onChange={setField("managerId")}
            size="small"
            required
          >
            {managers.length > 0 ? (
              managers.map((manager) => (
                <MenuItem key={manager.id} value={manager.id}>
                  {manager.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No managers</MenuItem>
            )}
          </TextField>

          <TextField
            select
            label="Department"
            value={employee?.departmentName ?? ""}
            onChange={setField("departmentName")}
            size="small"
            required
          >
            {departments.length > 0
              ? departments.map((departmentName) => (
                  <MenuItem key={departmentName} value={departmentName}>
                    {departmentName}
                  </MenuItem>
                ))
              : (
                <MenuItem value="">No departments</MenuItem>
              )}
          </TextField>

          <TextField
            label="Position"
            value={employee?.position ?? ""}
            onChange={setField("position")}
            size="small"
            sx={{ gridColumn: "1 / -1" }}
            required
          />

        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!isReady || submitting}
        >
          {submitting ? "Saving..." : "Save"}
        </Button>

      </DialogActions>
    </Dialog>
  );
}
