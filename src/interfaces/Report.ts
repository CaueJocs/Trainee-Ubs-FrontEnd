import { ExpenseCategory } from "@/enums/ExpenseCategory";
import type { ExpenseDetailResponse } from "./Expense";

export interface ExpenseReportReponse extends ExpenseDetailResponse {
    employeeId: string;
}
export interface EmployeeReportRequest {
    employeeIds: string[];
    dateFrom: string;
    dateTo: string;  
}

export interface ExpenseTypeReportRequest {
    categories: ExpenseCategory[];
    dateFrom: string;
    dateTo: string;  
}

export interface DepartmentReportRequest {
    departments: string[];
    dateFrom: string;
    dateTo: string;  
}