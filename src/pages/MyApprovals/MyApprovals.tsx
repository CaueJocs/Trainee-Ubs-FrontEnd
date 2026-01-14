import { useCallback, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { PendingApprovalsTable } from "./PendingApprovalsTable";
import { ApproveExpenseModal } from "./ApproveExpenseModal";
import type { ExpenseDetailResponse } from "@/interfaces/Expense";
import { Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";
import { ExpenseService } from "@/services/ExpenseService";

export function MyApprovals() {
  const { t } = useI18n();
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDetailResponse | null>(null);
  
  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

  const openDetail = useCallback((expense: ExpenseDetailResponse) => {
    setSelectedExpense(expense);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedExpense(null);
  }, []);

  const showSnackbar = useCallback((message: string, severity: AlertColor) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  }, []);

  const handleApprove = useCallback(async (expenseId: string) => {
    const success = await ExpenseService.approve(expenseId);
    
    if (success) {
      showSnackbar(t("myExpenses.expenseApproved"), "success");
      return true;
    } else {
      showSnackbar(t("myExpenses.expenseApproveFailed"), "error");
      return false;
    }
  }, [showSnackbar, t]);

  const handleDeny = useCallback(async (expenseId: string) => {
    const success = await ExpenseService.deny(expenseId);
    
    if (success) {
      showSnackbar(t("myExpenses.expenseDenied"), "success");
      return true;
    } else {
      showSnackbar(t("myExpenses.expenseDenyFailed"), "error");
      return false;
    }
  }, [showSnackbar, t]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-full h-auto">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            {t("header.approvals")}
          </h1>
          <section className="p-2 sm:p-4">
            <PendingApprovalsTable onRowClick={openDetail} />
          </section>
        </div>
      </main>

      {selectedExpense && (
        <ApproveExpenseModal
          expense={selectedExpense}
          onClose={closeDetail}
          onApprove={handleApprove}
          onDeny={handleDeny}
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
