import {Dialog,Select,MenuItem,FormControl,InputLabel,Autocomplete} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { ExpenseCategory } from "@/enums/ExpenseCategory";
import { CurrencyCode } from "@/enums/CurrencyCode";

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
    
  const [date, setDate] = useState<Dayjs | null>(null);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }


  function handleSubmit() {
    // validação simples
    // chamada de API
    // sucesso → onClose()
  }

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <h1 className="text-2xl font-light tracking-tight p-5">New Expense</h1>

      <div className="flex flex-col gap-6 px-5 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TextField
            disabled
            id="standard-read-only-input"
            label="Employee Name"
            defaultValue={form.employeeName}
            variant="standard"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <TextField
            disabled
            id="standard-read-only-input"
            label="Department Name"
            defaultValue={form.departmentName}
            variant="standard"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="expense-type-label">Category</InputLabel>
            <Select
              labelId="expense-type-label"
              value={form.type}
              label="Category"
              onChange={(e) =>
                update("type", e.target.value as ExpenseCategory)
              }
            >
              {Object.values(ExpenseCategory).map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label="Expense date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
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
                <TextField {...params} label="Currency" />
              )}
            />

            <TextField
              className="flex-1"
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => update("amount", Number(e.target.value))}
            />
          </div>

          <TextField
            label="Receipt URL"
            value={form.receiptUrl}
            onChange={(e) => update("receiptUrl", e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
          
          </div>
          <div className="flex justify-end gap-4 p-5">
            <button className="
                cursor-pointer
                w-20 h-9
                bg-[var(--ubs-gray)]
                hover:bg-[var(--ubs-seccondary-gray)]
                rounded-md
                font-semibold text-white text-sm
                transition-colors duration-200 ease-in-out"
                onClick={onClose}>Cancel</button>
            <button className="
                cursor-pointer
                w-20 h-9
                bg-[var(--ubs-red)]
                hover:bg-[var(--ubs-seccondary-red)]
                rounded-md
                font-semibold text-white text-sm
                transition-colors duration-200 ease-in-out"
                onClick={handleSubmit}>Save</button>
            <button className="
                cursor-pointer
                w-30 h-9
                bg-[var(--ubs-red)]
                hover:bg-[var(--ubs-seccondary-red)]
                rounded-md
                font-semibold text-white text-sm
                transition-colors duration-200 ease-in-out"
            onClick={handleSubmit}>Save and create</button>
        </div>
      </div>
    </Dialog>
  );
}
