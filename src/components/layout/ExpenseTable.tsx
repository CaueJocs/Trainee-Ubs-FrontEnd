import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { MyExpenseModal } from "../ui/Modal/ModalExpense/MyExpenseModal";
import type { ExpenseResponse } from "@/interfaces/Expense";

interface ExpenseTableProps {
  rows: ExpenseResponse[];
  onRowClick?: (expense: ExpenseResponse) => void;
}

export function ExpenseTable({ rows, onRowClick }: ExpenseTableProps) {
  const { t, formatDate } = useI18n();
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseResponse | null>(null);

  const columns: GridColDef<ExpenseResponse>[] = useMemo(
    () => [
      {
        field: "description",
        headerName: t("myExpenses.description"),
        minWidth: 200,
        flex: 1,
      },
      { field: "category", headerName: t("myExpenses.category"), minWidth: 160, flex: 1 },
      {
        field: "date",
        headerName: t("myExpenses.date"),
        minWidth: 160,
        flex: 1,
        valueGetter: (_value, expense) => {
          const d = new Date(expense.date);
          return `${formatDate(d)}`;
        },
      },

      {
        field: "amount",
        headerName: t("myExpenses.amount"),
        minWidth: 160,
        flex: 1,
        valueGetter: (_value, expense) => {

          return `${expense.currency} ${expense.amount.toFixed(2)}`;
        },
      },
      { field: "status", headerName: t("myExpenses.status"), minWidth: 160, flex: 1 },
    ],
    [t, formatDate]
  );

  function handleOpenModal(expense: ExpenseResponse) {
    console.log("Opening modal for expense:", expense);
    if (onRowClick) {
      onRowClick(expense);
    } else {
      setSelectedExpense(expense);
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
        <MyExpenseModal
          expense={selectedExpense}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
