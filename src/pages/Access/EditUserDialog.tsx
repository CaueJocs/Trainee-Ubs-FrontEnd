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
import type { EmployeeRequest } from "@/interfaces/Employee";

type Props = {
  open: boolean;
  user: EmployeeRow | null;
  onClose: () => void;
  onSave: (updated: EmployeeRow) => void;
};


export function EditUserDialog({ open, user, onClose, onSave }: Props) {
  const [employee, setEmployee] = useState<EmployeeRow | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [managers, setManagers] = useState<{ id: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);

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

  const isReady = useMemo(() => Boolean(employee), [employee]);

  const setField =
    (key: keyof EmployeeRow) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!employee) return;
      const value = key === "id" ? Number(e.target.value) : e.target.value;
      setEmployee({ ...employee, [key]: value as string });
    };

  const handleSave = async () => {
    if (!employee) return;
    setSaving(true);

    const payload = {
      name: employee.name,
      email: employee.email,
      departmentName: employee.departmentName,
      role: employee.role,
      position: employee.position,
      managerId: employee.managerId,
      active: employee.active,
    } as EmployeeRequest;

    const updated = await EmployeeService.putEmployee(String(employee.id), payload);
    setSaving(false);

    if (updated) {
      onSave(updated);
      onClose();
    } else {
      console.error("Failed to update employee");
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
          disabled={!isReady || saving}
        >
          {saving ? "Saving..." : "Save"}
        </Button>

      </DialogActions>
    </Dialog>
  );
}
