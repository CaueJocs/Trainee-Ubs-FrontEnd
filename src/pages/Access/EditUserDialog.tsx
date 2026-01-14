import { startTransition, useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { useI18n } from "@/i18n/I18nContext";
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
  const { t } = useI18n();
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

  const setField =
    (key: keyof EmployeeRow) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!employee) return;
      setEmployee({ ...employee, [key]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      <DialogTitle>{t("access.editUser")}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          id="edit-user-form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          }}
        >
          <TextField
            label={t("access.name")}
            value={employee?.name ?? ""}
            onChange={setField("name")}
            size="small"
            required
          />

          <TextField
            label={t("access.email")}
            value={employee?.email ?? ""}
            onChange={setField("email")}
            size="small"
            type="email"
            required
          />
  
          <TextField
            select
            label={t("access.manager")}
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
              <MenuItem value="">{t("access.noManagers")}</MenuItem>
            )}
          </TextField>

          <TextField
            select
            label={t("access.department")}
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
                <MenuItem value="">{t("access.noDepartments")}</MenuItem>
              )}
          </TextField>

          <TextField
            label={t("access.position")}
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
          type="button"
        >
          {t("access.cancel")}
        </Button>
        <Button
          type="submit"
          form="edit-user-form"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          {submitting ? t("access.saving") : t("access.save")}
        </Button>

      </DialogActions>
    </Dialog>
  );
}
