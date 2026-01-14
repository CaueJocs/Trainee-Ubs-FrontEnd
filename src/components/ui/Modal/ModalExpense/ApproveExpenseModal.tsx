import { Button, Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomizedSteppers from "../../ExpenseStepper";
import { useI18n } from "@/i18n/I18nContext";
import type { ExpenseDetailResponse } from "@/interfaces/Expense";

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
}

//Functions to be implemented later, when endpoints are ready
function handleApproveClick() {
  console.log("Approve button clicked");
}

function handleDenyClick() {
  console.log("Deny button clicked");
}

export function ApproveExpenseModal({ expense, onClose }: Props) {
  const { t } = useI18n();
  
  // Extract employee name and department name from ExpenseDetailResponse
  const employeeName = expense.employee.name;
  const departmentName = expense.department.name;
  const dateFormatted = formatDateTime(new Date(expense.date));

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <div>
        <h1 className="text-2xl font-light tracking-tight p-5">
          {employeeName}&apos;s {t("expenseModal.title")}
        </h1>

        <CustomizedSteppers expense={expense} />
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
        <div className="flex justify-end gap-4 p-5">
          {/* //Action buttons */}
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-charcoal)" }}
            onClick={handleDenyClick}
          >
            {t("expenseModal.deny")}
          </Button>
          
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-red)" }}
            onClick={handleApproveClick}
          >
            {t("expenseModal.approve")}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
