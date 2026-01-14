import { useCallback, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { PendingApprovalsTable } from "./PendingApprovalsTable";
import { ApproveExpenseModal } from "@/components/ui/Modal/ModalExpense/ApproveExpenseModal";
import type { ExpenseDetailResponse } from "@/interfaces/Expense";

export function MyApprovals() {
  const { t } = useI18n();
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDetailResponse | null>(null);

  const openDetail = useCallback((expense: ExpenseDetailResponse) => {
    setSelectedExpense(expense);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedExpense(null);
  }, []);

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
        />
      )}
    </div>
  );
}
