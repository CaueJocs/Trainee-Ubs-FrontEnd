import { Button, Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomizedSteppers from "../../ExpenseStepper";
import { AuthService } from "@/services/AuthService";
import type { ExpenseResponse, FinanceDecisionInfoBase, ManagerDecisionInfoBase } from "@/interfaces/Expense";

// Format a Date to an unambiguous, global local-time string: YYYY-MM-DD HH:mm:ss
function formatDateTime(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
// Props for the Modal component
interface Props {
  expense: ExpenseResponse;
  onClose: () => void;
}

// Define what should be shown on the 'description' of each field, and the according key on ExpenseResponse
const expenseFields = [
  [{ label: "Employee Name", valueKey: "employee.name" }],
  [{ label: "Department", valueKey: "departmentName" }],
  [{ label: "Category", valueKey: "category" }],
  [{ label: "Date", valueKey: "date" }],
  [
    { label: "Currency", valueKey: "currency" },
    { label: "Amount", valueKey: "amount" },
  ],
  [{ label: "Description", valueKey: "description" }],
];

//Functions to be implemented later, when endpoints are ready
function handleApproveClick() {
  console.log("Approve button clicked");
}

function handleDenyClick() {
  console.log("Deny button clicked");
}

export function ExpenseModal({ expense, onClose }: Props) {
  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <div>
        <h1 className="text-2xl font-light tracking-tight p-5">
          {AuthService.getUser()?.name}&apos;s Expense
        </h1>

        {/*Stepper component being used with existing Expense data*/}
        <CustomizedSteppers expense={expense} />
        <div className="h-px bg-black/15" />
        <div className="flex flex-col gap-6 px-5 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expenseFields.flat().map(({ label, valueKey }) => {
              const raw = expense[valueKey as keyof typeof expense];
              // Here's where all the text-fields are set, based on the ExpenseResponse data.
              //There're some special cases for certain fields bellow (Formating).

              // Currency field (separate)
              if (valueKey === "currency") {
                const currency = raw ?? "";
                return (
                  <TextField
                    key="currency"
                    label={label}
                    value={currency}
                    disabled
                  />
                );
              }

              // Amount field (separate)
              if (valueKey === "amount") {
                const amount = raw;
                const formatted =
                  typeof amount === "number" ? amount.toFixed(2) : amount ?? "";

                return (
                  <TextField
                    key="amount"
                    label={label}
                    value={formatted}
                    disabled
                  />
                );
              }

              // Description: make it wider and taller
              if (valueKey === "description") {
                const desc = raw ?? "";
                return (
                  <TextField
                    key="description"
                    className="md:col-span-3"
                    label={label}
                    value={desc}
                    disabled
                    multiline
                    minRows={4}
                  />
                );
              }

              let displayValue: boolean | string | number | ManagerDecisionInfoBase | FinanceDecisionInfoBase = raw ?? "";

              // Format date-like fields to an unambiguous global format with time
              if (
                typeof raw === "string" &&
                (valueKey === "date" || valueKey.toLowerCase().includes("date"))
              ) {
                const parsed = Date.parse(raw);
                if (!isNaN(parsed)) {
                  displayValue = formatDateTime(new Date(parsed));
                }
              }

              return (
                <TextField
                  key={valueKey}
                  label={label}
                  value={displayValue}
                  disabled
                />
              );
            })}
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
