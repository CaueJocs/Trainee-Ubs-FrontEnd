/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Autocomplete, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { ExpenseCategory } from "@/enums/ExpenseCategory";
import { CurrencyCode } from "@/enums/CurrencyCode";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// All the data that we'll have on the form
interface FormData {
  employeeName: string;
  departmentName: string;
  type: ExpenseCategory | "";
  date: string;
  currency: CurrencyCode | "";
  amount: number;
  receiptUrl?: string;
  description: string;
}

interface Props {
  onClose: () => void;
}

export function NewExpenseModal({ onClose }: Props) {
  // Initial form state
  // Currently, employeeName and departmentName are hardcoded, but in the future they should be fetched from the logged-in user's data
  const [form, setForm] = useState<FormData>({
    employeeName: "Joao Silva",
    departmentName: "Marketing",
    type: "",
    date: "",
    currency: "",
    amount: 0,
    receiptUrl: "",
    description: "",
  });

  //Used for the datePicker
  const [date, setDate] = useState<Dayjs | null>(null);
  //Used to verify if there were any unfilled required fields
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  //File upload handler, it currently doesn't upload files, only the name of the file
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      update("receiptUrl", file.name);
    }
  }

  //Function to validate form fields. used on click handlers of submit buttons
  function validateForm(): boolean {
    const newErrors: typeof errors = {};

    if (!form.type) newErrors.type = true;
    if (!form.currency) newErrors.currency = true;
    if (!form.amount || form.amount <= 0) newErrors.amount = true;
    if (!date) newErrors.date = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return false;
    return true;
  }

  function handleSubmit() {
    // Validate form before submitting. Waiting on endpoints to actually do something with the data
    if (!validateForm()) return;
    console.log(form);
    onClose();
  }

  function handleSaveAndCreate() {
    // Validate form before submitting -> 'Send data to back-end' -> reset form for new entry
    if (!validateForm()) return;
    console.log(form);
    setForm({
      employeeName: "Joao Silva",
      departmentName: "Marketing",
      type: "",
      date: "",
      currency: "",
      amount: 0,
      receiptUrl: "",
      description: "",
    });
  }
  function handleCancel() {
    onClose();
  }
  //Employee name and departament hardcoded. Made some special arrangements for certain fields (like upload and currency/amount)
  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <h1 className="text-2xl font-light tracking-tight p-5">New Expense</h1>

      <div className="flex flex-col gap-6 px-5 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TextField disabled label="Employee Name" value={form.employeeName} />

          <TextField disabled label="Department" value={form.departmentName} />
          
          <Autocomplete
            options={Object.values(ExpenseCategory)}
            value={form.type || null}
            onChange={(_, value) => update("type", value || "")}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Category"
                error={!!errors.type}
                helperText={errors.type ? "Required field" : ""}
              />
            )}
          />

          <DateTimePicker
            label="Expense date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
              update("date", newValue ? newValue.toISOString() : "");
            }}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                error: !!errors.date,
                helperText: errors.date ? "Required field" : "",
              },
            }}
          />

          <div className="flex gap-1">
            <Autocomplete
              className="w-32"
              options={Object.values(CurrencyCode)}
              value={form.currency || null}
              onChange={(_, value) => update("currency", value || "")}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Currency"
                  error={!!errors.currency}
                  helperText={errors.currency ? "Required field" : ""}
                />
              )}
            />

            <TextField
              required
              className="flex-1"
              label="Amount"
              error={!!errors.amount}
              helperText={errors.amount ? "Required field" : ""}
              type="number"
              value={form.amount === 0 ? "" : form.amount}
              onChange={(e) =>
                update(
                  "amount",
                  e.target.value === "" ? 0 : Number(e.target.value)
                )
              }
            />
          </div>

          <div className="flex gap-1">
            <TextField
              required
              disabled
              className="flex-1"
              label="Receipt URL"
              error={!!errors.amount}
              helperText={errors.amount ? "Required field" : ""}
              value={form.receiptUrl}
              onChange={(e) => update("receiptUrl", e.target.value)}
            />
            <input
              ref={(el) => {
                if (el) (window as any).__fileInputRef = el;
              }}
              type="file"
              accept="image/*,.pdf"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "var(--ubs-seccondary-gray)" }}
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                const input = (window as any)
                  .__fileInputRef as HTMLInputElement;
                input?.click();
              }}
            >
              Upload
            </Button>
          </div>

          <TextField
            label="Description"
            className="md:col-span-3"
            multiline
            minRows={1}
            maxRows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4 p-5">
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-gray)" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-red)" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-red)" }}
            onClick={handleSaveAndCreate}
          >
            Save and create
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
