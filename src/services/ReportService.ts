import { ReportApi } from "@/api/ReportApi";
import type { EmployeeReportRequest, ExpenseTypeReportRequest } from "@/interfaces/Report";
import { type ExpenseReportReponse } from "@/interfaces/Report";

export class ReportService {
    static async getEmployeeReport(employeeReportRequest : EmployeeReportRequest): Promise<ExpenseReportReponse[]> {
        try {
            const response = await ReportApi.getEmployeeReport(employeeReportRequest);
            return response;
        } catch (error) {
            console.error('Get Employee Report Exception:', error);
            return [];
        }
    }

    static async getExpenseTypeReport(expenseTypeReportRequest : ExpenseTypeReportRequest): Promise<ExpenseReportReponse[]> {
        try {
            const response = await ReportApi.getExpenseTypeReport(expenseTypeReportRequest);
            return response;
        } catch (error) {
            console.error('Get Expense Type Report Exception:', error);
            return [];
        }
    }
}