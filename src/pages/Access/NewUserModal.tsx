import { startTransition, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { MenuItem } from "@mui/material";
import { DepartmentService } from "@/services/DepartmentService";
import { EmployeeService } from "@/services/EmployeeService";
import type { EmployeeRequest } from "@/interfaces/Employee";
import { Role } from "@/enums/Role";

export type NewUserForm = EmployeeRequest;

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (mode: "save" | "saveAndCreate", values: NewUserForm) => Promise<boolean>;
};

const EMPTY_FORM: NewUserForm = {
  name: "",
  email: "",
  password: "",
  departmentName: "",
  position: "",
  managerId: "",
  role: Role.EMPLOYEE,
  active: true,
};

export function NewUserModal({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<NewUserForm>(EMPTY_FORM);
  const [departments, setDepartments] = useState<string[]>([]);
  const [managers, setManagers] = useState<{ id: string; name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      startTransition(() => setForm(EMPTY_FORM));
    }
  }, [open]);

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
    () => Boolean(form.name?.trim() && form.email?.trim() && form.password?.trim() && form.departmentName),
    [form]
  );

  const setField =
    (key: keyof NewUserForm) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async (mode: "save" | "saveAndCreate") => {
    if (submitting || !isReady) return;
    setSubmitting(true);
    try {
      const success = await onSave(mode, form);
      if (success) {
        if (mode === "save") {
          onClose();
        } else {
          setForm(EMPTY_FORM);
        }
      }
    } finally {
      setSubmitting(false);
    }
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
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          }}
        >
          <TextField
            label="Name"
            value={form.name}
            onChange={setField("name")}
            size="small"
            required
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={setField("email")}
            size="small"
            required
          />

          <TextField
            label="Password"
            value={form.password}
            onChange={setField("password")}
            size="small"
            type="password"
            required
          />

          <TextField
            select
            label="Department"
            value={form.departmentName}
            onChange={setField("departmentName")}
            size="small"
            required
          >
            {departments.length > 0 ? (
              departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No departments</MenuItem>
            )}
          </TextField>

          <TextField
            select
            label="Manager"
            value={form.managerId}
            onChange={setField("managerId")}
            size="small"
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
            label="Role"
            value={form.role}
            onChange={setField("role")}
            size="small"
          >
            <MenuItem value={Role.EMPLOYEE}>Employee</MenuItem>
            <MenuItem value={Role.MANAGER}>Manager</MenuItem>
            <MenuItem value={Role.FINANCE}>Finance</MenuItem>
            <MenuItem value={Role.ADMIN}>Admin</MenuItem>
          </TextField>

          <TextField
            label="Position"
            value={form.position}
            onChange={setField("position")}
            size="small"
            sx={{ gridColumn: "1 / -1" }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" color="secondary" disabled={submitting}>
          Cancel
        </Button>

        <Button
          onClick={() => handleSave("save")}
          variant="contained"
          color="primary"
          disabled={!isReady || submitting}
        >
          {submitting ? "Saving..." : "Save"}
        </Button>

        <Button
          onClick={() => handleSave("saveAndCreate")}
          variant="contained"
          color="primary"
          disabled={!isReady || submitting}
        >
          {submitting ? "Saving..." : "Save and create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
