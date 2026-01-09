import { useState } from 'react'

interface Approvals {
    name: string,
    expenseType: string,
    value: number
}

export function ApprovalsCard() {



    const mockApprovals: Approvals[] = [
        {
            name: 'João Silva',
            expenseType: 'Food',
            value: 500
        },
        {
            name: 'Carlos Pereira',
            expenseType: 'Transport',
            value: 750
        },
        {
            name: 'Maria Oliveira',
            expenseType: 'Food',
            value: 375.25
        },
        {
            name: 'Rafaela Santos',
            expenseType: 'Trip',
            value: 23000
        },
        {
            name: 'Pedro Costa',
            expenseType: 'Others',
            value: 1000
        }
    ]

    const [pendingApprovals, setPendingApprovals] = useState<Approvals[]>(mockApprovals)

    return (
        <div className="w-80 overflow-hidden rounded-lg border bg-white shadow-sm">

            <div className="bg-red-500 px-4 py-2 text-sm font-medium text-white">
                My Approvals
            </div>

            <ul className="divide-y text-sm">
                {pendingApprovals.map((approval, index) => (
                    <li
                        key={index}
                        className="grid grid-cols-[1.5fr_1fr_1fr] items-center px-4 py-2"
                    >
                        <span>{approval.name}</span>
                        <span>{approval.expenseType}</span>
                        
                        <span
                            className={approval.value > 10000 ? 'text-red-500' : ''}
                        >
                            R${approval.value.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2
                            })}
                        </span>
                    </li>
                ))}
            </ul>

        </div>
    )
}