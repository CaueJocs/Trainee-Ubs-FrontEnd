import type { ExpenseDetailResponse, ExpenseResponse } from '@/interfaces/Expense';


export type ModalPayload =
  | {
      type: 'ApproveExpense'
      data: ExpenseDetailResponse
    }
  | {
      type: 'MyExpense'
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
