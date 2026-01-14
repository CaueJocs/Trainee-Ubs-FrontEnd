import { Button, Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import type { ExpenseDetailResponse } from "@/interfaces/Expense";
import CustomizedSteppers from "./ExpenseStepper";

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
  // Extract employee name and department name from ExpenseDetailResponse
  const employeeName = expense.employee.name;
  const departmentName = expense.department.name;
  const dateFormatted = formatDateTime(new Date(expense.date));

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <div>
        <h1 className="text-2xl font-light tracking-tight p-5">
          {employeeName}&apos;s Expense
        </h1>

        <CustomizedSteppers expense={expense} />
        <div className="h-px bg-black/15" />
        <div className="flex flex-col gap-6 px-5 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextField
              label="Employee Name"
              value={employeeName}
              disabled
            />

            <TextField
              label="Department"
              value={departmentName}
              disabled
            />

            <TextField
              label="Category"
              value={expense.category}
              disabled
            />

            <TextField
              label="Date"
              value={dateFormatted}
              disabled
            />

            <TextField
              label="Currency"
              value={expense.currency}
              disabled
            />

            <TextField
              label="Amount"
              value={expense.amount.toFixed(2)}
              disabled
            />

            <TextField
              label="Description"
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
            Deny
          </Button>
          
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-red)" }}
            onClick={handleApproveClick}
          >
            Approve
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
