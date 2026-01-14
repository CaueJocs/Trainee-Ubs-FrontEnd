import type { ExpenseCategory } from "@/enums/ExpenseCategory";
import type { ExpenseStatus } from "@/enums/ExpenseStatus";
import type { CurrencyCode } from "@/enums/CurrencyCode";
import type { DecisionType } from "@/enums/DecisionType";

export interface ExpenseRequest {
  description: string;
  amount: number;
  currency: CurrencyCode;
  category: ExpenseCategory;
  expenseDate: string; // ISO date string (OffsetDateTime)
  receiptImage: File;
}

export interface ExpenseResponse {
  id: string;
  employeeId: string;
  departmentName: string;
  date: string; // ISO date string (OffsetDateTime)
  category: ExpenseCategory;
  amount: number;
  currency: CurrencyCode;
  exchangeRate: number;
  description: string;
  receiptUrl: string;
  revision: boolean;
  createdAt: string; // ISO date string (Instant)
  updatedAt: string; // ISO date string (Instant)
  status: ExpenseStatus;
}

export interface EmployeeInfo {
  id: string;
  name: string;
  email: string;
  position: string;
}

export interface ManagerDecisionInfo {
  manager: EmployeeInfo;
  decision: DecisionType;
  decisionDate: string; // ISO date string (OffsetDateTime)
}

export interface FinanceDecisionInfo {
  finance: EmployeeInfo;
  decision: DecisionType;
  decisionDate: string; // ISO date string (OffsetDateTime)
}

export interface DepartmentDetailedResponse {
  name: string;
  currency: CurrencyCode;
  monthlyBudget: number;
}

export interface ExpenseDetailResponse {
  id: string;
  employee: EmployeeInfo | null;
  department: DepartmentDetailedResponse | null;
  date: string; // ISO date string (OffsetDateTime)
  category: ExpenseCategory;
  amount: number;
  currency: CurrencyCode;
  exchangeRate: number;
  description: string;
  receiptUrl: string;
  managerDecision: ManagerDecisionInfo | null;
  financeDecision: FinanceDecisionInfo | null;
  revision: boolean;
  createdAt: string; // ISO date string (Instant)
  updatedAt: string; // ISO date string (Instant)
  status: ExpenseStatus;
}
