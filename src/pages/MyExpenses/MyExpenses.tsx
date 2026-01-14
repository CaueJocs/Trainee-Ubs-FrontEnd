import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { NewExpenseModal } from "@/pages/MyExpenses/NewExpenseModal";
import { MyExpenseTable } from "@/pages/MyExpenses/MyExpenseTable";
import { MyExpenseModal } from "@/pages/MyExpenses/MyExpenseModal";
import type { ExpenseResponse } from "@/interfaces/Expense";
import { Button, Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";
import { ExpenseService } from "@/services/ExpenseService";

const INITIAL_ROWS: ExpenseResponse[] = [];

export function MyExpenses() {
  const { t } = useI18n();
  const [rows, setRows] = useState<ExpenseResponse[]>(INITIAL_ROWS);

  // Modal states
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseResponse | null>(null);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

  const openNewExpense = useCallback(() => setIsNewExpenseOpen(true), []);
  const closeNewExpense = useCallback(() => setIsNewExpenseOpen(false), []);

  const openDetail = useCallback((expense: ExpenseResponse) => {
    setSelectedExpense(expense);
    setIsDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedExpense(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    ExpenseService.getMyExpenses().then((list) => {
      if (cancelled) return;
      setRows(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const showSnackbar = useCallback((message: string, severity: AlertColor) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  }, []);

  const handleSaveExpense = useCallback(
    async (mode: "save" | "saveAndCreate", success: boolean) => {
      if (success) {
        const expenses = await ExpenseService.getMyExpenses();
        setRows(expenses);
        showSnackbar(t("myExpenses.expenseCreated"), "success");
        
        if (mode === "save") {
          closeNewExpense();
        }
      } else {
        showSnackbar(t("myExpenses.expenseCreateFailed"), "error");
      }
    },
    [closeNewExpense, showSnackbar, t]
  );

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
            onClick={openNewExpense}
          >
            {t("myExpenses.newExpense")}
          </Button>
          <section className="p-2 sm:p-4">
            <MyExpenseTable rows={rows} onRowClick={openDetail} />
          </section>
        </div>
      </main>

      {isNewExpenseOpen && (
        <NewExpenseModal
          open={isNewExpenseOpen}
          onClose={closeNewExpense}
          onSave={handleSaveExpense}
        />
      )}

      {isDetailOpen && selectedExpense && (
        <MyExpenseModal
          expense={selectedExpense}
          onClose={closeDetail}
        />
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={(_: React.SyntheticEvent | Event, reason?: string) => {
          if (reason === "clickaway") return;
          setSnackOpen(false);
        }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
