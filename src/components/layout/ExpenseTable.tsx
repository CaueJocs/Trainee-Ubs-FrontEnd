import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { ExpenseModal } from "../ui/Modal/ModalExpense/ExpenseModal";
import { CurrencyCode } from "@/enums/CurrencyCode";
import { ExpenseCategory } from "@/enums/ExpenseCategory";
import { ExpenseStatus } from "@/enums/ExpenseStatus";



export interface ExpenseResponse {
  id: string;
  employeeId: string;
  employeeName: string;
  departmentName: string;
  date: string;
  category: ExpenseCategory;
  amount: number;
  currency: CurrencyCode;
  description: string;
  receiptUrl: string;
  createdAt: string;
  status: ExpenseStatus;
  managerApproval: string;
  managerApprovalDate: string;
  financeApproval: string;
  financeApprovalDate: string;
}

export function ExpenseTable() {
  const { t, formatDate } = useI18n();
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseResponse | null>(null);

  const rows: ExpenseResponse[] = [
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      employeeId: "e1234567-89ab-cdef-0123-456789abcdef",
      employeeName: "João Silva",
      departmentName: "Marketing",
      date: "2026-01-05T14:30:00-03:00",
      category: ExpenseCategory.MEAL,
      amount: 500.0,
      currency: CurrencyCode.BRL,
      description: "Almoço com cliente",
      receiptUrl: "https://example.com/receipt/1",
      createdAt: "2026-01-05T10:00:00Z",
      status: ExpenseStatus.APPROVED_BY_MANAGER,
      managerApproval: "Miguel Santos",
      managerApprovalDate: "2026-01-05T12:00:00Z",
      financeApproval: "",
      financeApprovalDate: "",
    },
    {
      id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      employeeId: "f2345678-90ab-cdef-1234-56789abcdef0",
      employeeName: "Carlos Pereira",
      departmentName: "Vendas",
      date: "2026-01-04T09:15:00-03:00",
      category: ExpenseCategory.TRANSPORT,
      amount: 750.0,
      currency: CurrencyCode.USD,
      description: "Uber para reunião",
      receiptUrl: "https://example.com/receipt/2",
      createdAt: "2026-01-04T15:30:00Z",
      status: ExpenseStatus.PENDING,
      managerApproval: "",
      managerApprovalDate: "",
      financeApproval: "",
      financeApprovalDate: "",
    },
    {
      id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
      employeeId: "a3456789-01bc-def1-2345-6789abcdef01",
      employeeName: "Maria Oliveira",
      departmentName: "RH",
      date: "2026-01-03T12:00:00-03:00",
      category: ExpenseCategory.MEAL,
      amount: 375.25,
      currency: CurrencyCode.BRL,
      description: "Coffee break equipe",
      receiptUrl: "https://example.com/receipt/3",
      createdAt: "2026-01-03T18:45:00Z",
      status: ExpenseStatus.APPROVED_BY_FINANCE,
      managerApproval: "Isabela Almeida",
      managerApprovalDate: "2026-01-03T14:00:00Z",
      financeApproval: "Rafael Gomes",
      financeApprovalDate: "2026-01-04T15:00:00Z",
    },
    {
      id: "d4e5f6a7-b8c9-0123-def1-234567890123",
      employeeId: "b4567890-12cd-ef12-3456-789abcdef012",
      employeeName: "Rafaela Santos",
      departmentName: "TI",
      date: "2025-12-28T08:00:00-03:00",
      category: ExpenseCategory.TRAVEL,
      amount: 23000.0,
      currency: CurrencyCode.EUR,
      description: "Viagem para conferência em São Paulo",
      receiptUrl: "https://example.com/receipt/4",
      createdAt: "2025-12-20T11:20:00Z",
      status: ExpenseStatus.REJECTED,
      managerApproval: "Mariana Costa",
      managerApprovalDate: "2025-12-21T09:00:00Z",
      financeApproval: "",
      financeApprovalDate: "",
    },
    {
      id: "e5f6a7b8-c9d0-1234-ef12-345678901234",
      employeeId: "c5678901-23de-f123-4567-89abcdef0123",
      employeeName: "Pedro Costa",
      departmentName: "Operações",
      date: "2026-01-02T16:45:00-03:00",
      category: ExpenseCategory.OTHER,
      amount: 1000.0,
      currency: CurrencyCode.BRL,
      description: "Material de escritório",
      receiptUrl: "https://example.com/receipt/5",
      createdAt: "2026-01-02T20:10:00Z",
      status: ExpenseStatus.APPROVED_BY_FINANCE,
      managerApproval: "Beatriz Sousa",
      managerApprovalDate: "2026-01-02T17:00:00Z",
      financeApproval: "Gabriel Ferreira",
      financeApprovalDate: "2026-01-03T08:30:00Z",
    },
    {
      id: "f6a7b8c9-d0e1-2345-f123-456789012345",
      employeeId: "d6789012-34ef-1234-5678-9abcdef01234",
      employeeName: "Ana Rodrigues",
      departmentName: "Financeiro",
      date: "2026-01-06T11:20:00-03:00",
      category: ExpenseCategory.MEAL,
      amount: 890.5,
      currency: CurrencyCode.BRL,
      description: "Jantar com investidores",
      receiptUrl: "https://example.com/receipt/6",
      createdAt: "2026-01-06T14:15:00Z",
      status: ExpenseStatus.PENDING,
      managerApproval: "",
      managerApprovalDate: "",
      financeApproval: "",
      financeApprovalDate: "",
    },
    {
      id: "a7b8c9d0-e1f2-3456-1234-567890123456",
      employeeId: "e7890123-45ef-2345-6789-abcdef012345",
      employeeName: "Lucas Mendes",
      departmentName: "Comercial",
      date: "2025-12-30T13:45:00-03:00",
      category: ExpenseCategory.TRANSPORT,
      amount: 15500.0,
      currency: CurrencyCode.BRL,
      description: "Passagem aérea para visita cliente",
      receiptUrl: "https://example.com/receipt/7",
      createdAt: "2025-12-29T09:30:00Z",
      status: ExpenseStatus.APPROVED_BY_MANAGER,
      managerApproval: "Fernanda Rocha",
      managerApprovalDate: "2025-12-29T11:00:00Z",
      financeApproval: "",
      financeApprovalDate: "",
    },
    {
      id: "b8c9d0e1-f2a3-4567-2345-678901234567",
      employeeId: "f8901234-56ef-3456-7890-bcdef0123456",
      employeeName: "Fernanda Lima",
      departmentName: "Jurídico",
      date: "2026-01-01T10:30:00-03:00",
      category: ExpenseCategory.OTHER,
      amount: 2500.0,
      currency: CurrencyCode.BRL,
      description: "Taxas de registro e documentação",
      receiptUrl: "https://example.com/receipt/8",
      createdAt: "2025-12-31T16:45:00Z",
      status: ExpenseStatus.REJECTED,
      managerApproval: "Pedro Lima",
      managerApprovalDate: "2025-12-31T09:00:00Z",
      financeApproval: "Ana Paula",
      financeApprovalDate: "2025-12-31T10:00:00Z",
    },
    {
      id: "c9d0e1f2-a3b4-5678-3456-789012345678",
      employeeId: "a9012345-67ef-4567-8901-cdef01234567",
      employeeName: "Roberto Alves",
      departmentName: "Logística",
      date: "2025-12-27T15:00:00-03:00",
      category: ExpenseCategory.TRANSPORT,
      amount: 4200.0,
      currency: CurrencyCode.USD,
      description: "Frete internacional de equipamentos",
      receiptUrl: "https://example.com/receipt/9",
      createdAt: "2025-12-27T18:20:00Z",
      status: ExpenseStatus.APPROVED_BY_FINANCE,
      managerApproval: "Ricardo Carvalho",
      managerApprovalDate: "2025-12-27T19:00:00Z",
      financeApproval: "Sofia Mendes",
      financeApprovalDate: "2025-12-28T08:00:00Z",
    },
  ];

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
          return `${amount.toFixed(2)} (${currency})`;
        },
      },
      { field: "status", headerName: t("myExpenses.status"), minWidth: 160, flex: 1 },
    ],
    [t, formatDate]
  );

  function handleOpenModal(row: ExpenseResponse) {
    console.log("Opening modal for expense:", row);
    setSelectedExpense(row);
  }

  function handleCloseModal() {
    setSelectedExpense(null);
  }

  return (
    <Box sx={{ mt: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        onRowClick={(params) => handleOpenModal(params.row)}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        sx={{
          mt: 2,
          border: "none",
          "& .MuiDataGrid-columnSeparator": { display: "none" },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#D9D9D9",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
          },

          "& .MuiDataGrid-row": {
            backgroundColor: "#F2F2F7",
            borderTop: "1px solid rgba(0,0,0,0.10)",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid rgba(0,0,0,0.10)",
          },
        }}
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
    </Box>
  );
}
