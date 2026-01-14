import { ExpenseApi } from "@/api/ExpenseApi";
import type { ExpenseRequest, ExpenseResponse, ExpenseDetailResponse } from "@/interfaces/Expense";

export class ExpenseService {

  static async create(expenseData: ExpenseRequest): Promise<ExpenseResponse | null> {
    try {
      const formData = new FormData();
      formData.append('description', expenseData.description);
      formData.append('amount', expenseData.amount.toString());
      formData.append('currency', expenseData.currency);
      formData.append('category', expenseData.category);
      formData.append('expenseDate', expenseData.expenseDate);
      formData.append('receiptImage', expenseData.receiptImage);

      const response = await ExpenseApi.create(formData);
      return response;
    } catch (error) {
      console.error('Create Expense Exception:', error);
      return null;
    }
  }

  static async getPendingExpensesForManager(): Promise<ExpenseResponse[]> {
    try {
      const response = await ExpenseApi.getPendingExpensesForManager();
      return response;
    } catch (error) {
      console.error('Get Pending Expenses For Manager Exception:', error);
      return [];
    }
  }

  static async getPendingExpensesForFinance(): Promise<ExpenseResponse[]> {
    try {
      const response = await ExpenseApi.getPendingExpensesForFinance();
      return response;
    } catch (error) {
      console.error('Get Pending Expenses For Finance Exception:', error);
      return [];
    }
  }

  static async getEmployeesExpensesForManager(): Promise<ExpenseResponse[]> {
    try {
      const response = await ExpenseApi.getEmployeesExpensesForManager();
      return response;
    } catch (error) {
      console.error('Get Employees Expenses For Manager Exception:', error);
      return [];
    }
  }

  static async getAllEmployeesExpenses(): Promise<ExpenseResponse[]> {
    try {
      const response = await ExpenseApi.getAllEmployeesExpenses();
      return response;
    } catch (error) {
      console.error('Get All Employees Expenses Exception:', error);
      return [];
    }
  }

  static async getMyExpenses(): Promise<ExpenseResponse[]> {
    try {
      const response = await ExpenseApi.getMyExpenses();
      return response;
    } catch (error) {
      console.error('Get My Expenses Exception:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<ExpenseDetailResponse | null> {
    try {
      const response = await ExpenseApi.getById(id);
      return response;
    } catch (error) {
      console.error('Get Expense By Id Exception:', error);
      return null;
    }
  }

  static async approve(id: string): Promise<boolean> {
    try {
      await ExpenseApi.approve(id);
      return true;
    } catch (error) {
      console.error('Approve Expense Exception:', error);
      return false;
    }
  }

  static async deny(id: string): Promise<boolean> {
    try {
      await ExpenseApi.deny(id);
      return true;
    } catch (error) {
      console.error('Deny Expense Exception:', error);
      return false;
    }
  }

}
