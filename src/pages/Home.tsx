import expenseManagerLogo from "@/assets/images/ubs-expense-manager-logo.png";

import { PendingApprovalsTable } from "@/pages/MyApprovals/PendingApprovalsTable";
import { useAuth } from "./Auth/useAuth";
import { Role } from "@/enums/Role";
import { MyExpenseTable } from "./MyExpenses/MyExpenseTable";
import { MyExpenseModal } from "./MyExpenses/MyExpenseModal";
import { ExpenseService } from "@/services/ExpenseService";
import type { ExpenseResponse } from "@/interfaces/Expense";
import { useCallback, useEffect, useState } from "react";

export function Home() {

  const { canAccess } = useAuth();
  const [myExpenses, setMyExpenses] = useState<ExpenseResponse[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseResponse | null>(null);

  useEffect(() => {
    if (canAccess([Role.EMPLOYEE, Role.MANAGER])) {
      let cancelled = false;
      ExpenseService.getMyExpenses().then((list) => {
        if (cancelled) return;
        setMyExpenses(list);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [canAccess]);

  const openDetail = useCallback((expense: ExpenseResponse) => {
    setSelectedExpense(expense);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedExpense(null);
  }, []);
  
  // Admin's cleaner home page
  if (canAccess([Role.ADMIN])) {
    return (
      <div className="flex min-h-[75vh] w-full items-center justify-center">
        <img
          src={expenseManagerLogo}
          alt="UBS Expense Manager"
          draggable={false}
          className="max-w-[700px] w-[80vw]"
        />
      </div>
    );
  }
  
  return (
    <div className="w-full pt-24">
      <div className="flex flex-col sm:flex-row">
        {/* Logo */}
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center p-4">
          <img
            src={expenseManagerLogo}
            alt="UBS"
            draggable={false}
            className="max-h-30 w-auto"
          />
        </div>

        {/* Tables */}
        <div className="flex w-full lg:w-1/2 justify-center p-4">
        {canAccess([Role.FINANCE]) && (
            <PendingApprovalsTable />
        )}
        {canAccess([Role.EMPLOYEE, Role.MANAGER]) && (
            <MyExpenseTable rows={myExpenses} onRowClick={openDetail} />
        )}
        </div>

      </div>

      {selectedExpense && (
        <MyExpenseModal
          expense={selectedExpense}
          onClose={closeDetail}
        />
      )}
    </div>
  );
}


