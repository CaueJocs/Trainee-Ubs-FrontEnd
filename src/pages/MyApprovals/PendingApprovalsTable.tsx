import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";
import type { ExpenseResponse, ExpenseDetailResponse } from "@/interfaces/Expense";
import { ApproveExpenseModal } from "./ApproveExpenseModal";
import { ExpenseService } from "@/services/ExpenseService";
import { useAuth } from "@/pages/Auth/useAuth";
import { Role } from "@/enums/Role";
import { Snackbar, Alert, Checkbox } from "@mui/material";
import type { AlertColor } from "@mui/material";

interface PendingApprovalsTableProps {
  onRowClick?: (expense: ExpenseDetailResponse) => void;
}

export function PendingApprovalsTable({ onRowClick }: PendingApprovalsTableProps) {
  const { t, formatDate } = useI18n();
  const { canAccess } = useAuth();
  const [rows, setRows] = useState<ExpenseResponse[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDetailResponse | null>(null);
  
  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

  const fetchExpensesList = useCallback(async () => {
    let expenses: ExpenseResponse[] = [];
    if (canAccess([Role.FINANCE])) {
      expenses = await ExpenseService.getAllEmployeesExpenses();
    } else if (canAccess([Role.MANAGER])) {
      expenses = await ExpenseService.getEmployeesExpensesForManager();
    }
    setRows(expenses);
  }, [canAccess]);

    useEffect(() => {
      (async () => {
        await fetchExpensesList();
      })();
    }, [fetchExpensesList]);

  const columns: GridColDef<ExpenseResponse>[] = useMemo(
    () => [
      {
        field: "departmentName",
        headerName: t("expenseModal.department"),
        minWidth: 100,
        flex: 1,
      },
      {
        field: "category",
        headerName: t("myExpenses.category"),
        minWidth: 100,
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
      {
        field: "revision",
        headerName: t("myExpenses.revision"),
        flex: 0,
        renderCell: (params) => (
          <Checkbox
            checked={Boolean(params.value)}
            disabled
            size="small"
          />
        ),
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

  const showSnackbar = useCallback((message: string, severity: AlertColor) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  }, []);

  const handleApprove = useCallback(async (expenseId: string) => {
    const success = await ExpenseService.approve(expenseId);
    
    if (success) {
      showSnackbar(t("myExpenses.expenseApproved"), "success");
      await fetchExpensesList(); // Refresh the table
      return true;
    } else {
      showSnackbar(t("myExpenses.expenseApproveFailed"), "error");
      return false;
    }
  }, [showSnackbar, t, fetchExpensesList]);

  const handleDeny = useCallback(async (expenseId: string) => {
    const success = await ExpenseService.deny(expenseId);
    
    if (success) {
      showSnackbar(t("myExpenses.expenseDenied"), "success");
      await fetchExpensesList(); // Refresh the table
      return true;
    } else {
      showSnackbar(t("myExpenses.expenseDenyFailed"), "error");
      return false;
    }
  }, [showSnackbar, t, fetchExpensesList]);

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