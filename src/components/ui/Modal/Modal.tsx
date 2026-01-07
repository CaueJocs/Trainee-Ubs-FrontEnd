import { Dialog } from '@mui/material'
import type { ModalPayload } from './types'
import CustomizedSteppers from './ExpenseStepper'
import TextField from '@mui/material/TextField';

interface Props {
  payload: ModalPayload
  onClose: () => void
}

export function Modal({ payload, onClose }: Props) {
  
    return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      {payload.type === 'Expense' && (
        <div>
            <h1 className='text-2xl font-light tracking-tight p-5'>{payload.data.employeeName}'s Expense</h1>
            <CustomizedSteppers expense={payload.data} />
            {/* <div>
            <TextField disabled label={payload.data.employeeName} />
            <TextField disabled label={payload.data.departmentName} />
            <TextField disabled label={payload.data.category} />
            <TextField disabled label={payload.data.date} />
            <TextField disabled label={payload.data.currency} />
            <TextField disabled label={payload.data.amount} />
            <TextField disabled label={payload.data.description} />
            <TextField disabled label={payload.data.receiptUrl} />
            <TextField disabled label={payload.data.status} />
            </div> */}
            
        </div>
      )}

      {payload.type === 'NewExpense' && (
        <div>Modal de exclusão</div>
      )}
    </Dialog>
  )
}
