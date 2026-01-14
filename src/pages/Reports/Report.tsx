import Button from "@mui/material/Button";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useState } from "react";

import { ExpenseCategory } from "@/enums/ExpenseCategory";
import { type ExpenseResponse } from "@/components/layout/PendingApprovalsTable";
import { ExpenseTable } from "@/components/layout/ExpenseTable";
import { ExpenseStatus } from "@/enums/ExpenseStatus";
import { CurrencyCode } from "@/enums/CurrencyCode";
import EmployeeReport from "./EmployeeReport";
import ExpenseTypeReport from "./ExpenseTypeReport";
import AreaBudgetReport from "./AreaBudgetReport";
import type { Dayjs } from "dayjs";

// Payload to backend
interface employeePayload {
  id: number;
  dateFrom: string;
  dateTo: string;
}

interface expenseTypePayload {
  expenseType: ExpenseCategory;
  dateFrom: string;
  dateTo: string;
}

interface areaBudgetPayload {
  area: string;
  dateFrom: string;
  dateTo: string;
}

const budgets = [
  { area: "Marketing", budget: 15000 },
  { area: "Engenharia", budget: 40000 },
];

const mockEmployee: ExpenseResponse[] = [
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
    employeeName: "João Silva",
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
    employeeName: "João Silva",
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
    employeeName: "João Silva",
    departmentName: "TI",
    date: "2025-12-28T08:00:00-03:00",
    category: ExpenseCategory.TRAVEL,
    amount: 2300.0,
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
    employeeName: "João Silva",
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
    employeeName: "João Silva",
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
    employeeName: "João Silva",
    departmentName: "Comercial",
    date: "2025-12-30T13:45:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 1550.0,
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
    employeeName: "João Silva",
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
    employeeName: "João Silva",
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
  {
    id: "cz-1",
    employeeId: "cz-emp-1",
    employeeName: "Caue Zanatti",
    departmentName: "Marketing",
    date: "2026-01-05T14:30:00-03:00",
    category: ExpenseCategory.MEAL,
    amount: 120.0,
    currency: CurrencyCode.BRL,
    description: "Café da manhã com equipe",
    receiptUrl: "https://example.com/receipt/cz1",
    createdAt: "2026-01-10T09:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "João Silva",
    managerApprovalDate: "2026-01-10T10:00:00Z",
    financeApproval: "Maria Oliveira",
    financeApprovalDate: "2026-01-10T11:00:00Z",
  },
  {
    id: "cz-2",
    employeeId: "cz-emp-2",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-04T09:15:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 800.0,
    currency: CurrencyCode.USD,
    description: "Viagem para conferência",
    receiptUrl: "https://example.com/receipt/cz2",
    createdAt: "2026-01-11T14:30:00Z",
    status: ExpenseStatus.PENDING,
    managerApproval: "Rafaela Santos",
    managerApprovalDate: "2026-01-11T15:00:00Z",
    financeApproval: "Pedro Costa",
    financeApprovalDate: "2026-01-11T16:00:00Z",
  },
  {
    id: "cz-3",
    employeeId: "cz-emp-3",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2025-12-28T08:00:00-03:00",
    category: ExpenseCategory.OTHER,
    amount: 300.0,
    currency: CurrencyCode.BRL,
    description: "Material promocional",
    receiptUrl: "https://example.com/receipt/cz3",
    createdAt: "2026-01-12T12:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Lucas Mendes",
    managerApprovalDate: "2026-01-12T13:00:00Z",
    financeApproval: "Fernanda Lima",
    financeApprovalDate: "2026-01-12T14:00:00Z",
  },
  {
    id: "cz-4",
    employeeId: "cz-emp-4",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-02T16:45:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 50.0,
    currency: CurrencyCode.BRL,
    description: "Coffee break",
    receiptUrl: "https://example.com/receipt/cz4",
    createdAt: "2026-01-13T08:30:00Z",
    status: ExpenseStatus.REJECTED,
    managerApproval: "Roberto Alves",
    managerApprovalDate: "2026-01-13T09:00:00Z",
    financeApproval: "Ana Rodrigues",
    financeApprovalDate: "2026-01-13T10:00:00Z",
  },
  {
    id: "cz-5",
    employeeId: "cz-emp-5",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-06T11:20:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 200.0,
    currency: CurrencyCode.BRL,
    description: "Uber para reunião",
    receiptUrl: "https://example.com/receipt/cz5",
    createdAt: "2026-01-14T10:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "Beatriz Sousa",
    managerApprovalDate: "2026-01-14T11:00:00Z",
    financeApproval: "Gabriel Ferreira",
    financeApprovalDate: "2026-01-14T12:00:00Z",
  },
  {
    id: "cz-6",
    employeeId: "cz-emp-6",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2025-12-30T13:45:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 150.0,
    currency: CurrencyCode.BRL,
    description: "Material de escritório",
    receiptUrl: "https://example.com/receipt/cz6",
    createdAt: "2026-01-15T16:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Isabela Almeida",
    managerApprovalDate: "2026-01-15T17:00:00Z",
    financeApproval: "Rafael Gomes",
    financeApprovalDate: "2026-01-15T18:00:00Z",
  },
  {
    id: "cz-7",
    employeeId: "cz-emp-7",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-01T10:30:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 80.0,
    currency: CurrencyCode.BRL,
    description: "Almoço com cliente",
    receiptUrl: "https://example.com/receipt/cz7",
    createdAt: "2026-01-16T11:30:00Z",
    status: ExpenseStatus.PENDING,
    managerApproval: "Pedro Lima",
    managerApprovalDate: "2026-01-16T12:00:00Z",
    financeApproval: "Ana Paula",
    financeApprovalDate: "2026-01-16T13:00:00Z",
  },
  {
    id: "cz-8",
    employeeId: "cz-emp-8",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2025-12-27T15:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 500.0,
    currency: CurrencyCode.USD,
    description: "Frete internacional",
    receiptUrl: "https://example.com/receipt/cz8",
    createdAt: "2026-01-17T15:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Ricardo Carvalho",
    managerApprovalDate: "2026-01-17T16:00:00Z",
    financeApproval: "Sofia Mendes",
    financeApprovalDate: "2026-01-17T17:00:00Z",
  },
  {
    id: "cz-9",
    employeeId: "cz-emp-9",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-18T13:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 60.0,
    currency: CurrencyCode.BRL,
    description: "Jantar com investidores",
    receiptUrl: "https://example.com/receipt/cz9",
    createdAt: "2026-01-18T13:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "Fernanda Rocha",
    managerApprovalDate: "2026-01-18T14:00:00Z",
    financeApproval: "Lucas Mendes",
    financeApprovalDate: "2026-01-18T15:00:00Z",
  },
  {
    id: "cz-10",
    employeeId: "cz-emp-10",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-19T09:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 110.0,
    currency: CurrencyCode.BRL,
    description: "Taxas de registro",
    receiptUrl: "https://example.com/receipt/cz10",
    createdAt: "2026-01-19T09:30:00Z",
    status: ExpenseStatus.REJECTED,
    managerApproval: "João Silva",
    managerApprovalDate: "2026-01-19T10:00:00Z",
    financeApproval: "Maria Oliveira",
    financeApprovalDate: "2026-01-19T11:00:00Z",
  },
];

const mockExpenseType: ExpenseResponse[] = [
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
    employeeName: "João Silva",
    departmentName: "Vendas",
    date: "2026-01-04T09:15:00-03:00",
    category: ExpenseCategory.MEAL,
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
    employeeName: "João Silva",
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
    employeeName: "João Silva",
    departmentName: "TI",
    date: "2025-12-28T08:00:00-03:00",
    category: ExpenseCategory.MEAL,
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
    employeeName: "João Silva",
    departmentName: "Operações",
    date: "2026-01-02T16:45:00-03:00",
    category: ExpenseCategory.MEAL,
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
    employeeName: "João Silva",
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
    employeeName: "João Silva",
    departmentName: "Comercial",
    date: "2025-12-30T13:45:00-03:00",
    category: ExpenseCategory.MEAL,
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
    employeeName: "João Silva",
    departmentName: "Jurídico",
    date: "2026-01-01T10:30:00-03:00",
    category: ExpenseCategory.MEAL,
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
    employeeName: "João Silva",
    departmentName: "Logística",
    date: "2025-12-27T15:00:00-03:00",
    category: ExpenseCategory.MEAL,
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
  {
    id: "cz-1",
    employeeId: "cz-emp-1",
    employeeName: "Caue Zanatti",
    departmentName: "Marketing",
    date: "2026-01-10T09:00:00-03:00",
    category: ExpenseCategory.MEAL,
    amount: 120.0,
    currency: CurrencyCode.BRL,
    description: "Café da manhã com equipe",
    receiptUrl: "https://example.com/receipt/cz1",
    createdAt: "2026-01-10T09:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "João Silva",
    managerApprovalDate: "2026-01-10T10:00:00Z",
    financeApproval: "Maria Oliveira",
    financeApprovalDate: "2026-01-10T11:00:00Z",
  },
  {
    id: "cz-2",
    employeeId: "cz-emp-2",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-11T14:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 800.0,
    currency: CurrencyCode.USD,
    description: "Viagem para conferência",
    receiptUrl: "https://example.com/receipt/cz2",
    createdAt: "2026-01-11T14:30:00Z",
    status: ExpenseStatus.PENDING,
    managerApproval: "Rafaela Santos",
    managerApprovalDate: "2026-01-11T15:00:00Z",
    financeApproval: "Pedro Costa",
    financeApprovalDate: "2026-01-11T16:00:00Z",
  },
  {
    id: "cz-3",
    employeeId: "cz-emp-3",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-12T12:00:00-03:00",
    category: ExpenseCategory.OTHER,
    amount: 300.0,
    currency: CurrencyCode.BRL,
    description: "Material promocional",
    receiptUrl: "https://example.com/receipt/cz3",
    createdAt: "2026-01-12T12:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Lucas Mendes",
    managerApprovalDate: "2026-01-12T13:00:00Z",
    financeApproval: "Fernanda Lima",
    financeApprovalDate: "2026-01-12T14:00:00Z",
  },
  {
    id: "cz-4",
    employeeId: "cz-emp-4",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-13T08:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 50.0,
    currency: CurrencyCode.BRL,
    description: "Coffee break",
    receiptUrl: "https://example.com/receipt/cz4",
    createdAt: "2026-01-13T08:30:00Z",
    status: ExpenseStatus.REJECTED,
    managerApproval: "Roberto Alves",
    managerApprovalDate: "2026-01-13T09:00:00Z",
    financeApproval: "Ana Rodrigues",
    financeApprovalDate: "2026-01-13T10:00:00Z",
  },
  {
    id: "cz-5",
    employeeId: "cz-emp-5",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-14T10:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 200.0,
    currency: CurrencyCode.BRL,
    description: "Uber para reunião",
    receiptUrl: "https://example.com/receipt/cz5",
    createdAt: "2026-01-14T10:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "Beatriz Sousa",
    managerApprovalDate: "2026-01-14T11:00:00Z",
    financeApproval: "Gabriel Ferreira",
    financeApprovalDate: "2026-01-14T12:00:00Z",
  },
  {
    id: "cz-6",
    employeeId: "cz-emp-6",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-15T16:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 150.0,
    currency: CurrencyCode.BRL,
    description: "Material de escritório",
    receiptUrl: "https://example.com/receipt/cz6",
    createdAt: "2026-01-15T16:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Isabela Almeida",
    managerApprovalDate: "2026-01-15T17:00:00Z",
    financeApproval: "Rafael Gomes",
    financeApprovalDate: "2026-01-15T18:00:00Z",
  },
  {
    id: "cz-7",
    employeeId: "cz-emp-7",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-16T11:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 80.0,
    currency: CurrencyCode.BRL,
    description: "Almoço com cliente",
    receiptUrl: "https://example.com/receipt/cz7",
    createdAt: "2026-01-16T11:30:00Z",
    status: ExpenseStatus.PENDING,
    managerApproval: "Pedro Lima",
    managerApprovalDate: "2026-01-16T12:00:00Z",
    financeApproval: "Ana Paula",
    financeApprovalDate: "2026-01-16T13:00:00Z",
  },
  {
    id: "cz-8",
    employeeId: "cz-emp-8",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-17T15:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 500.0,
    currency: CurrencyCode.USD,
    description: "Frete internacional",
    receiptUrl: "https://example.com/receipt/cz8",
    createdAt: "2026-01-17T15:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Ricardo Carvalho",
    managerApprovalDate: "2026-01-17T16:00:00Z",
    financeApproval: "Sofia Mendes",
    financeApprovalDate: "2026-01-17T17:00:00Z",
  },
  {
    id: "cz-9",
    employeeId: "cz-emp-9",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-18T13:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 60.0,
    currency: CurrencyCode.BRL,
    description: "Jantar com investidores",
    receiptUrl: "https://example.com/receipt/cz9",
    createdAt: "2026-01-18T13:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "Fernanda Rocha",
    managerApprovalDate: "2026-01-18T14:00:00Z",
    financeApproval: "Lucas Mendes",
    financeApprovalDate: "2026-01-18T15:00:00Z",
  },
  {
    id: "cz-10",
    employeeId: "cz-emp-10",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-19T09:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 110.0,
    currency: CurrencyCode.BRL,
    description: "Taxas de registro",
    receiptUrl: "https://example.com/receipt/cz10",
    createdAt: "2026-01-19T09:30:00Z",
    status: ExpenseStatus.REJECTED,
    managerApproval: "João Silva",
    managerApprovalDate: "2026-01-19T10:00:00Z",
    financeApproval: "Maria Oliveira",
    financeApprovalDate: "2026-01-19T11:00:00Z",
  },
];

const mockArea: ExpenseResponse[] = [
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
    employeeName: "João Silva",
    departmentName: "Marketing",
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
    employeeName: "João Silva",
    departmentName: "Marketing",
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
    employeeName: "João Silva",
    departmentName: "Marketing",
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
    employeeName: "João Silva",
    departmentName: "Marketing",
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
    employeeName: "João Silva",
    departmentName: "Marketing",
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
    employeeName: "João Silva",
    departmentName: "Marketing",
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
    employeeName: "João Silva",
    departmentName: "Marketing",
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
    employeeName: "João Silva",
    departmentName: "Marketing",
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
  {
    id: "cz-1",
    employeeId: "cz-emp-1",
    employeeName: "Caue Zanatti",
    departmentName: "Marketing",
    date: "2026-01-10T09:00:00-03:00",
    category: ExpenseCategory.MEAL,
    amount: 120.0,
    currency: CurrencyCode.BRL,
    description: "Café da manhã com equipe",
    receiptUrl: "https://example.com/receipt/cz1",
    createdAt: "2026-01-10T09:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "João Silva",
    managerApprovalDate: "2026-01-10T10:00:00Z",
    financeApproval: "Maria Oliveira",
    financeApprovalDate: "2026-01-10T11:00:00Z",
  },
  {
    id: "cz-2",
    employeeId: "cz-emp-2",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-11T14:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 800.0,
    currency: CurrencyCode.USD,
    description: "Viagem para conferência",
    receiptUrl: "https://example.com/receipt/cz2",
    createdAt: "2026-01-11T14:30:00Z",
    status: ExpenseStatus.PENDING,
    managerApproval: "Rafaela Santos",
    managerApprovalDate: "2026-01-11T15:00:00Z",
    financeApproval: "Pedro Costa",
    financeApprovalDate: "2026-01-11T16:00:00Z",
  },
  {
    id: "cz-3",
    employeeId: "cz-emp-3",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-12T12:00:00-03:00",
    category: ExpenseCategory.OTHER,
    amount: 300.0,
    currency: CurrencyCode.BRL,
    description: "Material promocional",
    receiptUrl: "https://example.com/receipt/cz3",
    createdAt: "2026-01-12T12:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Lucas Mendes",
    managerApprovalDate: "2026-01-12T13:00:00Z",
    financeApproval: "Fernanda Lima",
    financeApprovalDate: "2026-01-12T14:00:00Z",
  },
  {
    id: "cz-4",
    employeeId: "cz-emp-4",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-13T08:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 50.0,
    currency: CurrencyCode.BRL,
    description: "Coffee break",
    receiptUrl: "https://example.com/receipt/cz4",
    createdAt: "2026-01-13T08:30:00Z",
    status: ExpenseStatus.REJECTED,
    managerApproval: "Roberto Alves",
    managerApprovalDate: "2026-01-13T09:00:00Z",
    financeApproval: "Ana Rodrigues",
    financeApprovalDate: "2026-01-13T10:00:00Z",
  },
  {
    id: "cz-5",
    employeeId: "cz-emp-5",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-14T10:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 200.0,
    currency: CurrencyCode.BRL,
    description: "Uber para reunião",
    receiptUrl: "https://example.com/receipt/cz5",
    createdAt: "2026-01-14T10:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "Beatriz Sousa",
    managerApprovalDate: "2026-01-14T11:00:00Z",
    financeApproval: "Gabriel Ferreira",
    financeApprovalDate: "2026-01-14T12:00:00Z",
  },
  {
    id: "cz-6",
    employeeId: "cz-emp-6",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-15T16:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 150.0,
    currency: CurrencyCode.BRL,
    description: "Material de escritório",
    receiptUrl: "https://example.com/receipt/cz6",
    createdAt: "2026-01-15T16:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Isabela Almeida",
    managerApprovalDate: "2026-01-15T17:00:00Z",
    financeApproval: "Rafael Gomes",
    financeApprovalDate: "2026-01-15T18:00:00Z",
  },
  {
    id: "cz-7",
    employeeId: "cz-emp-7",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-16T11:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 80.0,
    currency: CurrencyCode.BRL,
    description: "Almoço com cliente",
    receiptUrl: "https://example.com/receipt/cz7",
    createdAt: "2026-01-16T11:30:00Z",
    status: ExpenseStatus.PENDING,
    managerApproval: "Pedro Lima",
    managerApprovalDate: "2026-01-16T12:00:00Z",
    financeApproval: "Ana Paula",
    financeApprovalDate: "2026-01-16T13:00:00Z",
  },
  {
    id: "cz-8",
    employeeId: "cz-emp-8",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-17T15:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 500.0,
    currency: CurrencyCode.USD,
    description: "Frete internacional",
    receiptUrl: "https://example.com/receipt/cz8",
    createdAt: "2026-01-17T15:30:00Z",
    status: ExpenseStatus.APPROVED_BY_FINANCE,
    managerApproval: "Ricardo Carvalho",
    managerApprovalDate: "2026-01-17T16:00:00Z",
    financeApproval: "Sofia Mendes",
    financeApprovalDate: "2026-01-17T17:00:00Z",
  },
  {
    id: "cz-9",
    employeeId: "cz-emp-9",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-18T13:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 60.0,
    currency: CurrencyCode.BRL,
    description: "Jantar com investidores",
    receiptUrl: "https://example.com/receipt/cz9",
    createdAt: "2026-01-18T13:30:00Z",
    status: ExpenseStatus.APPROVED_BY_MANAGER,
    managerApproval: "Fernanda Rocha",
    managerApprovalDate: "2026-01-18T14:00:00Z",
    financeApproval: "Lucas Mendes",
    financeApprovalDate: "2026-01-18T15:00:00Z",
  },
  {
    id: "cz-10",
    employeeId: "cz-emp-10",
    employeeName: "Caue Zanatti",
    departmentName: "Engenharia",
    date: "2026-01-19T09:00:00-03:00",
    category: ExpenseCategory.TRANSPORT,
    amount: 110.0,
    currency: CurrencyCode.BRL,
    description: "Taxas de registro",
    receiptUrl: "https://example.com/receipt/cz10",
    createdAt: "2026-01-19T09:30:00Z",
    status: ExpenseStatus.REJECTED,
    managerApproval: "João Silva",
    managerApprovalDate: "2026-01-19T10:00:00Z",
    financeApproval: "Maria Oliveira",
    financeApprovalDate: "2026-01-19T11:00:00Z",
  },
];

export function Report() {
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [selectedReport, setSelectedReport] = useState<string>("EMP");
  const [employees, setEmployees] = useState<string[]>([]);
  const [createReport, setCreateReport] = useState<boolean>(false);

  const employeeOptions = ["João Silva", "Caue Zanatti"];
  const expenseTypeOptions = ["MEAL", "TRANSPORT"];
  const areaOptions = ["Marketing", "Engenharia"];

  function getOptions() {
    if (selectedReport === "EMP") {
      return employeeOptions;
    } else if (selectedReport === "EXP") {
      return expenseTypeOptions;
    } else if (selectedReport === "ARE") {
      return areaOptions;
    }
  }

  function handleEmployeeReport() {
    setSelectedReport("EMP");
  }
  function handleExpenseTypeReport() {
    setSelectedReport("EXP");
  }
  function handleAreaBudgetReport() {
    setSelectedReport("ARE");
  }
  function handleCreateReport() {
    setCreateReport(true);
  }

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-100vh w-full pb-5">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            Reports{" "}
          </h1>

          <div className="flex w-full max-w-6xl  gap-4 mt-4 pl-5">
            <Button
              sx={{
                bgcolor:
                  selectedReport === "EMP"
                    ? "var(--ubs-red)"
                    : "var(--ubs-charcoal)",
                borderRadius: 5,
              }}
              variant="contained"
              onClick={handleEmployeeReport}
            >
              Employee
            </Button>
            <Button
              sx={{
                bgcolor:
                  selectedReport === "EXP"
                    ? "var(--ubs-red)"
                    : "var(--ubs-charcoal)",
                borderRadius: 5,
              }}
              variant="contained"
              onClick={handleExpenseTypeReport}
            >
              Expense Type
            </Button>
            <Button
              sx={{
                bgcolor:
                  selectedReport === "ARE"
                    ? "var(--ubs-red)"
                    : "var(--ubs-charcoal)",
                borderRadius: 5,
              }}
              variant="contained"
              onClick={handleAreaBudgetReport}
            >
              Area Budget
            </Button>
          </div>
          <div className="flex w-full max-w-6xl  gap-4 mt-4 pl-5">
            <Autocomplete
              multiple
              options={getOptions() || []}
              value={employees}
              onChange={(_, newValue) => setEmployees(newValue)}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    selectedReport === "EMP"
                      ? "Employee"
                      : selectedReport === "EXP"
                      ? "Expense Type"
                      : "Area"
                  }
                  size="small"
                />
              )}
              sx={{
                width: 260,
                "& .MuiAutocomplete-inputRoot": {
                  height: 40,
                  overflow: "auto",
                  alignItems: "center",
                },
              }}
            />

            <DatePicker
              label="Date From"
              slotProps={{
                textField: {
                  size: "small",
                  sx: { width: 260 },
                },
              }}
              value={dateFrom}
              onChange={(newValue) => setDateFrom(newValue)}
            />

            <DatePicker
              label="Date To"
              slotProps={{
                textField: {
                  size: "small",
                  sx: { width: 260 },
                },
              }}
              value={dateTo}
              onChange={(newValue) => setDateTo(newValue)}
            />

            <Button
              onClick={handleCreateReport}
              sx={{
                bgcolor: "var(--ubs-red)",
                alignSelf: "flex-start",
                "&.Mui-disabled": {
                  bgcolor: "var(--ubs-charcoal)",
                  color: "#aaa",
                },
              }}
              disabled={
                employees.length === 0 || dateFrom === null || dateTo === null
              }
            >
              Create Report
            </Button>
          </div>

          <div className="flex justify-center w-full pt-5">
            {createReport &&
              selectedReport === "EMP" &&
              employees.length > 0 && (
                <EmployeeReport data={mockEmployee} employees={employees} />
              )}
            {createReport &&
              selectedReport === "EXP" &&
              employees.length > 0 && (
                <ExpenseTypeReport
                  data={mockExpenseType}
                  expenseTypes={employees}
                />
              )}
            {createReport &&
              selectedReport === "ARE" &&
              employees.length > 0 && (
                <AreaBudgetReport
                  data={mockArea}
                  areas={employees}
                  budgets={budgets}
                />
              )}
              
          </div>
          <div>
            <ExpenseTable />
          </div>
        </div>
      </main>
    </div>
  );
}
