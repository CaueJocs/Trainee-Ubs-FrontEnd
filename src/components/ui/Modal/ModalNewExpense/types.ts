import { ExpenseCategory } from "@/enums/ExpenseCategory";
import { CurrencyCode } from "@/enums/CurrencyCode";

export interface modalPayload {
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
}