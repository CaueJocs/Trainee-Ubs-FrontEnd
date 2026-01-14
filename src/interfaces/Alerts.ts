import type { AlertStatus } from "@/enums/AlertStatus";
import type { AlertType } from "@/enums/AlertType";

export interface AlertResponse {
  id: string;
  expenseId: string;
  type: AlertType;
  message: string;
  status: AlertStatus;
  createdAt: string;
  updatedAt: string;
}
