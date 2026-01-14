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

import type { DepartmentRow } from "./Departments";

type Props = {
  open: boolean;
  department: DepartmentRow | null;
  onClose: () => void;
  onSave: (payload: { name: string; departmentName: string }) => Promise<void>;
};

export function RenameDepartmentModal({ open, department, onClose, onSave }: Props) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && department) {
      startTransition(() => setName(department.name));
    }
  }, [open, department]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!department || submitting) return;
    setSubmitting(true);
    try {
      await onSave({ name: department.name, departmentName: name.trim() });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("departments.renameDepartment")}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          id="rename-department-form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, display: "grid", gap: 2 }}
        >
          <TextField
            label={t("departments.name")}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            size="small"
            required
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          disabled={submitting}
          type="button"
        >
          {t("departments.cancel")}
        </Button>
        <Button
          type="submit"
          form="rename-department-form"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          {submitting ? t("departments.saving") : t("departments.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
