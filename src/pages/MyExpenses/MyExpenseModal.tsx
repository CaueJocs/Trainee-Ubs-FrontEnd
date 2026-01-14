import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomizedSteppers from "../../components/ui/ExpenseStepper";
import { AuthService } from "@/services/AuthService";
import type { ExpenseResponse } from "@/interfaces/Expense";
import { useI18n } from "@/i18n/I18nContext";

interface Props {
  expense: ExpenseResponse;
  onClose: () => void;
}

export function MyExpenseModal({ expense, onClose }: Props) {
  const { t, formatDate } = useI18n();
  const dateFormatted = formatDate(new Date(expense.date));

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <div>
        <h1 className="text-2xl font-light tracking-tight p-5">
          {AuthService.getUser()?.name ?? ""}&apos;s {t("expenseModal.title")}
        </h1>

        <CustomizedSteppers expense={expense} />
        <div className="h-px bg-black/15" />
        <div className="flex flex-col gap-6 px-5 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TextField
              label={t("expenseModal.employeeName")}
              value={AuthService.getUser()?.name ?? ""}
              disabled
            />

            <TextField
              label={t("expenseModal.department")}
              value={expense.departmentName ?? ""}
              disabled
            />

            <TextField
              label={t("expenseModal.category")}
              value={expense.category ?? ""}
              disabled
            />

            <TextField
              label={t("expenseModal.date")}
              value={dateFormatted}
              disabled
            />

            <TextField
              label={t("expenseModal.currency")}
              value={expense.currency ?? ""}
              disabled
            />

            <TextField
              label={t("expenseModal.amount")}
              value={expense.amount.toFixed(2)}
              disabled
            />

            <TextField
              label={t("expenseModal.description")}
              value={expense.description ?? ""}
              disabled
              multiline
              minRows={4}
              sx={{ gridColumn: "1 / -1" }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
