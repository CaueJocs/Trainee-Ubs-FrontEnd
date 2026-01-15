import { http } from "./BaseApi";
import type { ExpenseResponse, ExpenseDetailResponse } from "@/interfaces/Expense";

export const ExpenseApi = {

    create: async (expenseData: FormData): Promise<ExpenseResponse> => {
        const response = await http.post<ExpenseResponse>('/expenses', expenseData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getPendingExpensesForManager: async (): Promise<ExpenseResponse[]> => {
        const response = await http.get<ExpenseResponse[]>('/expenses/pending/manager');
        return response.data;
    },

    getPendingExpensesForFinance: async (): Promise<ExpenseResponse[]> => {
        const response = await http.get<ExpenseResponse[]>('/expenses/pending/finance');
        return response.data;
    },

    getEmployeesExpensesForManager: async (): Promise<ExpenseResponse[]> => {
        const response = await http.get<ExpenseResponse[]>('/expenses/manager');
        return response.data;
    },

    getAllEmployeesExpenses: async (): Promise<ExpenseResponse[]> => {
        const response = await http.get<ExpenseResponse[]>('/expenses/finance');
        return response.data;
    },

    getMyExpenses: async (): Promise<ExpenseResponse[]> => {
        const response = await http.get<ExpenseResponse[]>('/expenses/my');
        return response.data;
    },

    getById: async (id: string): Promise<ExpenseDetailResponse> => {
        const response = await http.get<ExpenseDetailResponse>(`/expenses/${id}`);
        return response.data;
    },

    approveManager: async (id: string): Promise<void> => {
        await http.patch(`/expenses/${id}/approve/manager`);
    },

    approveFinance: async (id: string): Promise<void> => {
        await http.patch(`/expenses/${id}/approve/finance`);
    },

    denyManager: async (id: string): Promise<void> => {
        await http.patch(`/expenses/${id}/deny/manager`);
    },

    denyFinance: async (id: string): Promise<void> => {
        await http.patch(`/expenses/${id}/deny/finance`);
    }

};
