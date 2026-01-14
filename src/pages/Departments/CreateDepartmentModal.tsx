import { startTransition, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import { useI18n } from "@/i18n/I18nContext";
import { CurrencyCode } from "@/enums/CurrencyCode";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (payload: { departmentName: string; currency: string }) => void;
};

export function CreateDepartmentModal({ open, onClose, onSave }: Props) {
  const { t } = useI18n();
  const [departmentName, setDepartmentName] = useState("");
  const [currency, setCurrency] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      startTransition(() => {
        setDepartmentName("");
        setCurrency(null);
      });
    }
  }, [open]);

  const currencyOptions = useMemo(() => Object.values(CurrencyCode), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !currency) return;
    setSubmitting(true);
    try {
      await onSave({ departmentName: departmentName.trim(), currency });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("departments.newDepartment")}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          id="create-department-form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            display: "grid",
            gap: 2,
          }}
        >
          <TextField
            label={t("departments.name")}
            value={departmentName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDepartmentName(e.target.value)}
            size="small"
            required
          />

          <Autocomplete
            options={currencyOptions}
            value={currency}
            onChange={(_, value) => setCurrency(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("departments.currency")}
                size="small"
                required
              />
            )}
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
          form="create-department-form"
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
