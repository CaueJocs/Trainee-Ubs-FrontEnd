import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import type { ModalPayload } from "./types";
import CustomizedSteppers from "./ExpenseStepper";

const AnimatedTextField = styled(TextField)(() => ({
  "& .MuiInput-root": {
    position: "relative",
  },
  "& .MuiInput-root::before": {
    borderBottomColor: "#ccc",
    transition: "border-bottom-color 0.3s ease",
  },
  "& .MuiInput-root:hover::before": {
    borderBottomColor: "var(--ubs-red)",
  },
}));

interface Props {
  payload: ModalPayload;
  onClose: () => void;
}

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

          <CustomizedSteppers expense={payload.data} />

          <div className="flex flex-col gap-6 px-5 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {expenseFields.flat().map(({ label, valueKey }) => {
                // Skip currency field if it's paired with amount
                if (
                  valueKey === "currency" &&
                  expenseFields.some(
                    (row) =>
                      row.length === 2 &&
                      row.some((r) => r.valueKey === "amount")
                  )
                ) {
                  return null;
                }

                // Special case: combine currency and amount
                if (valueKey === "amount") {
                  const currency =
                    payload.data["currency" as keyof typeof payload.data];
                  const amount =
                    payload.data["amount" as keyof typeof payload.data];

                  const formatted =
                    currency && typeof amount === "number"
                      ? `${currency} ${amount.toFixed(2)}`
                      : "";

                  return (
                    <AnimatedTextField
                      key="currency_amount"
                      label="Amount"
                      value={formatted}
                      variant="standard"
                      fullWidth
                      slotProps={{ input: { readOnly: true } }}
                    />
                  );
                }

                const raw =
                  payload.data[valueKey as keyof typeof payload.data];

                let displayValue: string | number = raw ?? "";

                // Format date-like fields to day/month/year (pt-BR)
                if (
                  typeof raw === "string" &&
                  (valueKey === "date" ||
                    valueKey.toLowerCase().includes("date"))
                ) {
                  const parsed = Date.parse(raw);
                  if (!isNaN(parsed)) {
                    displayValue = new Date(parsed).toLocaleDateString(
                      "pt-BR"
                    );
                  }
                }

                return (
                  <AnimatedTextField
                    key={valueKey}
                    label={label}
                    value={displayValue }
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

      {payload.type === "NewExpense" && <div>Modal de exclusão</div>}
    </Dialog>
  );
}
