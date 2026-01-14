import { Dialog, Button, Tooltip, DialogTitle, DialogContent, DialogActions, MenuItem, Box, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useRef, useEffect, startTransition, useMemo } from "react";
import { ExpenseCategory } from "@/enums/ExpenseCategory";
import { CurrencyCode } from "@/enums/CurrencyCode";
import type { ExpenseRequest } from "@/interfaces/Expense";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useI18n } from "@/i18n/I18nContext";
import { ExpenseService } from "@/services/ExpenseService";

// All the data that we'll have on the form
interface FormData {
  employeeName: string;
  departmentName: string;
  type: ExpenseCategory | "";
  date: string;
  currency: CurrencyCode | "";
  amount: string;
  receiptUrl?: string;
  description: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (mode: "save" | "saveAndCreate", success: boolean) => void;
}

const EMPTY_FORM: FormData = {
  employeeName: "Joao Silva",
  departmentName: "Marketing",
  type: "",
  date: "",
  currency: "",
  amount: "",
  receiptUrl: "",
  description: "",
};

export function NewExpenseModal({ open, onClose, onSave }: Props) {
  const { t } = useI18n();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      startTransition(() => {
        setForm(EMPTY_FORM);
        setReceiptFile(null);
      });
    }
  }, [open]);

  const currencyOptions = useMemo(() => Object.values(CurrencyCode), []);

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      setField("receiptUrl", file.name);
    }
  }

  const handleSubmit = async (e: React.FormEvent, mode: "save" | "saveAndCreate") => {
    e.preventDefault();
    if (submitting || !receiptFile) return;
    setSubmitting(true);
    try {
      const expenseDateTime = new Date(form.date).toISOString();
      
      const expenseData: ExpenseRequest = {
        description: form.description,
        amount: Number(form.amount),
        currency: form.currency as CurrencyCode,
        category: form.type as ExpenseCategory,
        expenseDate: expenseDateTime,
        receiptImage: receiptFile,
      };
      
      const result = await ExpenseService.create(expenseData);
      if (result) {
        if (mode === "save") {
          onClose();
        } else {
          setForm(EMPTY_FORM);
          setReceiptFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
        onSave(mode, true);
      } else {
        onSave(mode, false);
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("myExpenses.newExpense")}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          id="new-expense-form"
          onSubmit={(e) => handleSubmit(e, "save")}
          sx={{
            mt: 1,
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          }}
        >

          <TextField
            select
            label={t("myExpenses.category")}
            value={form.type}
            onChange={(e) => setField("type", e.target.value as ExpenseCategory)}
            size="small"
            required
          >
            {Object.values(ExpenseCategory).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label={t("myExpenses.date")}
            type="datetime-local"
            value={form.date}
            onChange={(e) => setField("date", e.target.value)}
            size="small"
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <Autocomplete
            options={currencyOptions}
            value={form.currency || null}
            onChange={(_, value) => setField("currency", value || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("myExpenses.currency")}
                size="small"
                required
              />
            )}
          />

          <TextField
            label={t("myExpenses.amount")}
            type="number"
            value={form.amount}
            onChange={(e) => setField("amount", e.target.value)}
            size="small"
            required
          />

          <TextField
            label={t("expenseModal.description")}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            size="small"
            multiline
            minRows={1}
            maxRows={4}
            sx={{ gridColumn: "1 / -1" }}
          />

          <Box sx={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              label={t("myExpenses.upload")}
              value={form.receiptUrl || ""}
              disabled
              size="small"
              sx={{ flex: 1 }}
              required
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "var(--ubs-charcoal)" }}
              startIcon={<CloudUploadIcon />}
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              {t("myExpenses.upload")}
            </Button>
          </Box>
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
          {t("access.cancel")}
        </Button>

        <Button
          type="submit"
          form="new-expense-form"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          {submitting ? t("access.saving") : t("access.save")}
        </Button>

        <Tooltip title={t("myExpenses.saveAndCreateTooltip")} placement="top" arrow>
          <Button
            onClick={(e) => {
              const formEl = document.getElementById("new-expense-form") as HTMLFormElement;
              if (formEl?.reportValidity()) {
                handleSubmit(e as unknown as React.FormEvent, "saveAndCreate");
              }
            }}
            variant="contained"
            color="primary"
            disabled={submitting}
            type="button"
            endIcon={<HelpOutlineIcon />}
          >
            {submitting ? t("access.saving") : t("access.saveAndCreate")}
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
}
