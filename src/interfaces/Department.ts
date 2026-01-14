import type { CurrencyCode } from "@/enums/CurrencyCode";
import type { ExpenseCategory } from "@/enums/ExpenseCategory";
import type { SpendingType } from "@/enums/SpendingType";

export interface DepartmentResponse {
    name: string;
    currency: CurrencyCode;
    monthlyBudget: number;
}


export interface DepartmentDetailedResponse extends DepartmentResponse {
  spendingSettings: SpendingSettingResponse[];
}

export interface SpendingSettingResponse {
    category: ExpenseCategory;
    type: SpendingType;
    budget: number;
}