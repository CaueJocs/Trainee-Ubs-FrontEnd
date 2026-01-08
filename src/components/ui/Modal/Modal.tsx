import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import type { ModalPayload } from "./types";
import CustomizedSteppers from "./ExpenseStepper";


// This function is used to animate the red underline on hovered text fields
const AnimatedTextField = styled(TextField)(() => ({
  // Target the underline element used by MUI's `standard` variant
  "& .MuiInput-underline:before": {
    borderBottomColor: "#ccc",
    transition: "border-bottom-color 0.25s ease",
  },
  // Hover state (use recommended selector to avoid disabled inputs)
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "var(--ubs-red)",
  },
  // Focused/after state
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--ubs-red)",
  },
  // Increase specificity in case other rules override
  "&.Mui-focused .MuiInput-underline:after": {
    borderBottomColor: "var(--ubs-red)",
  },
}));

// Format a Date to an unambiguous, global local-time string: YYYY-MM-DD HH:mm:ss
function formatDateTime(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
// Props for the Modal component
interface Props {
  payload: ModalPayload;
  onClose: () => void;
}

// Define what should be shown on the 'description' of each field, and the according key on ExpenseResponse
const expenseFields = [
  [{ label: "Employee Name", valueKey: "employeeName" }],
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

export function Modal({ payload, onClose }: Props) {
  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      {payload.type === "Expense" && (
        <div>
          <h1 className="text-2xl font-light tracking-tight p-5">
            {payload.data.employeeName}&apos;s Expense
          </h1>

          {/*Stepper component being used with existing Expense data*/}
          <CustomizedSteppers expense={payload.data} />

          <div className="flex flex-col gap-6 px-5 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {expenseFields.flat().map(({ label, valueKey }) => {
                const raw = payload.data[valueKey as keyof typeof payload.data];
                // Here's where all the text-fields are set, based on the ExpenseResponse data.
                //There're some special cases for certain fields bellow (Formating).
                
                // Currency field (separate)
                if (valueKey === "currency") {
                  const currency = raw ?? "";
                  return (
                    <AnimatedTextField
                      key="currency"
                      label={label}
                      value={currency}
                      variant="standard"
                      fullWidth
                      slotProps={{ input: { readOnly: true } }}
                    />
                  );
                }

                // Amount field (separate)
                if (valueKey === "amount") {
                  const amount = raw;
                  const formatted =
                    typeof amount === "number"
                      ? amount.toFixed(2)
                      : amount ?? "";

                  return (
                    <AnimatedTextField
                      key="amount"
                      label={label}
                      value={formatted}
                      variant="standard"
                      fullWidth
                      slotProps={{ input: { readOnly: true } }}
                    />
                  );
                }

                // Description: make it wider and taller
                if (valueKey === "description") {
                  const desc = raw ?? "";
                  return (
                    <AnimatedTextField
                      key="description"
                      className="md:col-span-3"
                      label={label}
                      value={desc}
                      variant="standard"
                      fullWidth
                      multiline
                      minRows={4}
                      slotProps={{ input: { readOnly: true } }}
                    />
                  );
                }

                let displayValue: string | number = raw ?? "";

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
                  <AnimatedTextField
                    key={valueKey}
                    label={label}
                    value={displayValue}
                    variant="standard"
                    fullWidth
                    slotProps={{
                      input: { readOnly: true },
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex justify-end gap-4 p-5">
            {/* //Action buttons */}
            <button
              className="
                cursor-pointer
                w-20 h-9
                bg-[var(--ubs-gray)]
                hover:bg-[var(--ubs-seccondary-gray)]
                rounded-md
                font-semibold text-white text-sm
                transition-colors duration-200 ease-in-out"
                onClick={() => handleDenyClick()}>
              Deny
            </button>
            <button
              className="
                cursor-pointer
                w-20 h-9
                bg-[var(--ubs-red)]
                hover:bg-[var(--ubs-seccondary-red)]
                rounded-md
                font-semibold text-white text-sm
                transition-colors duration-200 ease-in-out"
                onClick={() => handleApproveClick()}>
              Approve
            </button>
          </div>
        </div>
      )}


      {/* //I was inicially thinking of using this file to keep all modals,
      but maybe that shouldn't be the way to do so. For now, just keeping this here. */}
      {payload.type === "NewExpense" && <div>Modal de exclusão</div>}
    </Dialog>
  );
}
