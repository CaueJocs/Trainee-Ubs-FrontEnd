import type { ExpenseResponse } from '@/components/layout/PendingApprovalsTable';


export type ModalPayload =
  | {
      type: 'Expense'
      data: ExpenseResponse
    }
  | {
      type: 'NewExpense'
      data: ExpenseResponse
    }

export interface ModalContextType {
  openModal: (payload: ModalPayload) => void
  closeModal: () => void
}
