import type { ExpenseCategory } from "@/enums/ExpenseCategory";
import type { ExpenseStatus } from "@/enums/ExpenseStatus";
import type { CurrencyCode } from "@/enums/CurrencyCode";
import type { DecisionType } from "@/enums/DecisionType";
import type { DepartmentDetailedResponse } from "./Department";

export interface ExpenseRequest {
    description: string;
    amount: number;
    currency: CurrencyCode;
    category: ExpenseCategory;
    expenseDate: string; // ISO date string (OffsetDateTime)
    receiptImage: File;
}

// Expense Response
export interface ExpenseResponseBase {
    id: string;
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
export interface ExpenseResponse extends ExpenseResponseBase {
    employeeId: string;
    departmentName: string;
    managerDecision: ManagerDecisionInfo | null;
    financeDecision: FinanceDecisionInfo | null;
}
export interface ExpenseDetailResponse extends ExpenseResponseBase {
    employee: EmployeeInfo;
    department: DepartmentDetailedResponse;
    managerDecision: ManagerDetailedDecisionInfo | null;
    financeDecision: FinanceDetailedDecisionInfo | null;
}

export interface EmployeeInfo {
    id: string;
    name: string;
    email: string;
    position: string;
}

// Manager Decision
export interface ManagerDecisionInfoBase {
    decision: DecisionType;
    decisionDate: string; // ISO date string (OffsetDateTime)
}
export interface ManagerDetailedDecisionInfo extends ManagerDecisionInfoBase {
    manager: EmployeeInfo;
}
export interface ManagerDecisionInfo extends ManagerDecisionInfoBase {
    managerId: string;
}

// Finance Decision
export interface FinanceDecisionInfoBase {
    decision: DecisionType;
    decisionDate: string; // ISO date string (OffsetDateTime)
}
export interface FinanceDetailedDecisionInfo extends FinanceDecisionInfoBase {
    finance: EmployeeInfo;
}
export interface FinanceDecisionInfo extends FinanceDecisionInfoBase {
    financeId: string;
}
