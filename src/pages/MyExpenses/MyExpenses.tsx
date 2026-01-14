import { useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { NewExpenseModal } from "@/components/ui/Modal/ModalNewExpense/NewExpenseModal";
import { ExpenseTable } from "@/components/layout/ExpenseTable";
import Button from "@mui/material/Button";

export function MyExpenses() {
  const { t } = useI18n();
  const [openNewExpense, setOpenNewExpense] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-full h-auto">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            {t("myExpenses.title")}
          </h1>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-red)", ml: 2 }}
            onClick={() => setOpenNewExpense(true)}
          >
            {t("myExpenses.newExpense")}
          </Button>
          <div className="pl-5 pr-5">
            <ExpenseTable />
          </div>
        </div>
        {openNewExpense && (
          <NewExpenseModal onClose={() => setOpenNewExpense(false)} />
        )}
      </main>
    </div>
  );
}
