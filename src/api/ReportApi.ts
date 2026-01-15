
import { http } from "./BaseApi";
import { type ExpenseReportReponse } from "@/interfaces/Report";
import type { EmployeeReportRequest, ExpenseTypeReportRequest } from "@/interfaces/Report";
    
export const ReportApi = {
    getEmployeeReport: async (employeeReportRequest : EmployeeReportRequest): Promise<ExpenseReportReponse[]> => {
        const response = await http.post<ExpenseReportReponse[]>('/expenses/reports/by-employee', employeeReportRequest);
        return response.data;
    },
    
    getExpenseTypeReport: async (expenseTypeReportRequest : ExpenseTypeReportRequest): Promise<ExpenseReportReponse[]> => {
        const response = await http.post<ExpenseReportReponse[]>('/expenses/reports/by-category', expenseTypeReportRequest);
        return response.data;
    }
}