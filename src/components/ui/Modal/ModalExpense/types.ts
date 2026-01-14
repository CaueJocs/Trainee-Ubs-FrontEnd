import type { ExpenseDetailResponse, ExpenseResponse } from '@/interfaces/Expense';


export type ModalPayload =
  | {
      type: 'Expense'
      data: ExpenseResponse | ExpenseDetailResponse
    }
  | {
      type: 'NewExpense'
      data: ExpenseResponse
    }

export interface ModalContextType {
  openModal: (payload: ModalPayload) => void
  closeModal: () => void
}
