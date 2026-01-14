import { ExpenseCategory } from @/enums/ExpenseCategory;


export interface employeeReportRequest {
    employeeIds: string[];
    categories: ExpenseCategory[];
    departmentNames: string[];
    dateFrom: string;
    dateTo: string;  
}

export interface EmployeeReportResponse {
    id: string;
    employeeId: string;
    departmentName: string;
    date: string;
    category: ExpenseCategory;
    amount: number;
    currency: string;
    exchangeRate: number;
    description: string;
    receiptUrl: string;
    revision: boolean;
    createdAt: string;
    updatedAt: string;
    status: string;
}
