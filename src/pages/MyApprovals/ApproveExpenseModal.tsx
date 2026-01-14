import { Button, Dialog, DialogActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomizedSteppers from "../../components/ui/Modal/Expense/ExpenseStepper";
import { useI18n } from "@/i18n/I18nContext";
import type { ExpenseDetailResponse } from "@/interfaces/Expense";
import { useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { ExpenseStatus } from "@/enums/ExpenseStatus";

// Format a Date to an unambiguous, global local-time string: YYYY-MM-DD HH:mm:ss
function formatDateTime(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

interface Props {
  expense: ExpenseDetailResponse;
  onClose: () => void;
  onApprove: (expenseId: string) => Promise<boolean>;
  onDeny: (expenseId: string) => Promise<boolean>;
}

export function ApproveExpenseModal({ expense, onClose, onApprove, onDeny }: Props) {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  
  // Extract employee name and department name from ExpenseDetailResponse
  const employeeName = expense.employee.name;
  const departmentName = expense.department.name;
  const dateFormatted = formatDateTime(new Date(expense.date));

  const handleApproveClick = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const success = await onApprove(expense.id);
      if (success) {
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDenyClick = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const success = await onDeny(expense.id);
      if (success) {
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <div>
        <h1 className="text-2xl font-light tracking-tight p-5">
          {employeeName}&apos;s {t("expenseModal.title")}
        </h1>

        <div className="mb-4">
          <CustomizedSteppers expense={expense} />
        </div>
        
        <div className="h-px bg-black/15" />
        <div className="flex flex-col gap-6 px-5 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextField
              label={t("expenseModal.employeeName")}
              value={employeeName}
              disabled
            />

            <TextField
              label={t("expenseModal.department")}
              value={departmentName}
              disabled
            />

            <TextField
              label={t("expenseModal.category")}
              value={expense.category}
              disabled
            />

            <TextField
              label={t("expenseModal.date")}
              value={dateFormatted}
              disabled
            />

            <TextField
              label={t("expenseModal.currency")}
              value={expense.currency}
              disabled
            />

            <TextField
              label={t("expenseModal.amount")}
              value={expense.amount.toFixed(2)}
              disabled
            />

            <TextField
              label={t("expenseModal.description")}
              value={expense.description}
              disabled
              multiline
              minRows={4}
              sx={{ gridColumn: "1 / -1" }}
            />
          </div>
        </div>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          {/* //Action buttons */}
          <Button
              variant="contained"
              color="warning"
              type="button"
              endIcon={<ReceiptIcon />}
              onClick={() => window.open(expense.receiptUrl, "_blank")}
            >
              {t("expenseModal.viewReceipt")}
          </Button>

          {expense.status === ExpenseStatus.APPROVED_BY_MANAGER && (
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-charcoal)" }}
            onClick={handleDenyClick}
            disabled={submitting}
          >
            {submitting ? t("access.saving") : t("expenseModal.deny")}
          </Button>
          )}  
          
          {expense.status === ExpenseStatus.APPROVED_BY_MANAGER && (
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-red)" }}
            onClick={handleApproveClick}
            disabled={submitting}
          >
            {submitting ? t("access.saving") : t("expenseModal.approve")}
          </Button>
          )}

        </DialogActions>
      </div>
    </Dialog>
  );
}
