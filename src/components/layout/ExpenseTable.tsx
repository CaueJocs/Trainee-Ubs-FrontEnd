import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { ExpenseModal } from "../ui/Modal/ModalExpense/ExpenseModal";
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
        valueGetter: (_value, row) => {
          const d = new Date(row.date);
          return `${formatDate(d)}`;
        },
      },

      {
        field: "amount",
        headerName: t("myExpenses.amount"),
        minWidth: 160,
        flex: 1,
        valueGetter: (_value, row) => {
          const amount = Number(row.amount ?? 0);
          const currency = row.currency;
          return `${currency} ${amount.toFixed(2)}`;
        },
      },
      { field: "status", headerName: t("myExpenses.status"), minWidth: 160, flex: 1 },
    ],
    [t, formatDate]
  );

  function handleOpenModal(row: ExpenseResponse) {
    console.log("Opening modal for expense:", row);
    if (onRowClick) {
      onRowClick(row);
    } else {
      setSelectedExpense(row);
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
        <ExpenseModal
          payload={{
            type: "Expense",
            data: selectedExpense,
          }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
