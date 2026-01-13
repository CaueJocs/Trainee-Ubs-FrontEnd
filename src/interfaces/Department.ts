import type { CurrencyCode } from "@/enums/CurrencyCode";

export interface DepartmentResponse {
    name: string;
    currency: CurrencyCode;
    monthlyBudget: number;
}
