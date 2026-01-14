import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";
import type { ExpenseResponse, ExpenseDetailResponse } from "@/interfaces/Expense";
import { ApproveExpenseModal } from "../../components/ui/Modal/ModalExpense/ApproveExpenseModal";
import { ExpenseService } from "@/services/ExpenseService";
import { useAuth } from "@/pages/Auth/useAuth";
import { Role } from "@/enums/Role";

interface PendingApprovalsTableProps {
  onRowClick?: (expense: ExpenseDetailResponse) => void;
}

export function PendingApprovalsTable({ onRowClick }: PendingApprovalsTableProps) {
  const { t, formatDate } = useI18n();
  const { canAccess } = useAuth();
  const [rows, setRows] = useState<ExpenseResponse[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDetailResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchExpenses = async () => {
      let expenses: ExpenseResponse[] = [];
      if (canAccess([Role.FINANCE])) {
        expenses = await ExpenseService.getPendingExpensesForFinance();
      } else if (canAccess([Role.MANAGER])) {
        expenses = await ExpenseService.getPendingExpensesForManager();
      }
      if (!cancelled) {
        setRows(expenses);
      }
    };
    fetchExpenses();
    return () => {
      cancelled = true;
    };
  }, [canAccess]);

  const columns: GridColDef<ExpenseResponse>[] = useMemo(
    () => [
      {
        field: "employeeName",
        headerName: t("expenseModal.employeeName"),
        minWidth: 150,
        flex: 1,
        valueGetter: (_value, expense) => expense.employeeId || "",
      },
      {
        field: "departmentName",
        headerName: t("expenseModal.department"),
        minWidth: 120,
        flex: 1,
      },
      {
        field: "category",
        headerName: t("myExpenses.category"),
        minWidth: 120,
        flex: 1,
      },
      {
        field: "date",
        headerName: t("myExpenses.date"),
        minWidth: 100,
        flex: 1,
        valueGetter: (_value, expense) => {
          const d = new Date(expense.date);
          return `${formatDate(d)}`;
        },
      },
      {
        field: "amount",
        headerName: t("myExpenses.amount"),
        minWidth: 110,
        flex: 1,
        align: "right",
        headerAlign: "right",
        valueGetter: (_value, expense) => {
          return `${expense.currency} ${expense.amount.toFixed(2)}`;
        },
      },
      {
        field: "status",
        headerName: t("myExpenses.status"),
        minWidth: 100,
        flex: 1,
      },
    ],
    [t, formatDate]
  );

  async function handleOpenModal(expense: ExpenseResponse) {
    const expenseDetail = await ExpenseService.getById(expense.id);
    if (expenseDetail) {
      if (onRowClick) {
        onRowClick(expenseDetail);
      } else {
        setSelectedExpense(expenseDetail);
      }
    }
  }

  function handleCloseModal() {
    setSelectedExpense(null);
  }

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={(params) => handleOpenModal(params.row)}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          },
        }}
        autoHeight={false}
        sx={{ mt: 2, overflow: "auto", height: "60vh" }}
      />
      {selectedExpense && (
        <ApproveExpenseModal
          expense={selectedExpense}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
