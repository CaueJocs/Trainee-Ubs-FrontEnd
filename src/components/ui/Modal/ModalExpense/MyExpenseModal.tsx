import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomizedSteppers from "./ExpenseStepper";
import { AuthService } from "@/services/AuthService";
import type { ExpenseResponse } from "@/interfaces/Expense";

// Format a Date to an unambiguous, global local-time string: YYYY-MM-DD HH:mm:ss
function formatDateTime(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

interface Props {
  expense: ExpenseResponse;
  onClose: () => void;
}

export function MyExpenseModal({ expense, onClose }: Props) {
  const dateFormatted = formatDateTime(new Date(expense.date));

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <div>
        <h1 className="text-2xl font-light tracking-tight p-5">
          {AuthService.getUser()?.name ?? ""}&apos;s Expense
        </h1>

        <CustomizedSteppers expense={expense} />
        <div className="h-px bg-black/15" />
        <div className="flex flex-col gap-6 px-5 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TextField
              label="Employee Name"
              value={AuthService.getUser()?.name ?? ""}
              disabled
            />

            <TextField
              label="Department"
              value={expense.departmentName ?? ""}
              disabled
            />

            <TextField
              label="Category"
              value={expense.category ?? ""}
              disabled
            />

            <TextField
              label="Date"
              value={dateFormatted}
              disabled
            />

            <TextField
              label="Currency"
              value={expense.currency ?? ""}
              disabled
            />

            <TextField
              label="Amount"
              value={expense.amount.toFixed(2)}
              disabled
            />

            <TextField
              label="Description"
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
