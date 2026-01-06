import { CurrencyCode } from '@/enums/CurrencyCode';
import { ExpenseCategory } from '@/enums/ExpenseCategory';
import { ExpenseStatus } from '@/enums/ExpenseStatus';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

interface ExpenseResponse {
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
    createdAt: string;
    status: ExpenseStatus;
}

export function PendingApprovalsTable() {

    const mockApprovals: ExpenseResponse[] = [
        {
            id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
            employeeId: 'e1234567-89ab-cdef-0123-456789abcdef',
            employeeName: 'João Silva',
            departmentName: 'Marketing',
            date: '2026-01-05T14:30:00-03:00',
            category: ExpenseCategory.MEAL,
            amount: 500.00,
            currency: CurrencyCode.BRL,
            description: 'Almoço com cliente',
            receiptUrl: 'https://example.com/receipt/1',
            createdAt: '2026-01-05T10:00:00Z',
            status: ExpenseStatus.PENDING
        },
        {
            id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
            employeeId: 'f2345678-90ab-cdef-1234-56789abcdef0',
            employeeName: 'Carlos Pereira',
            departmentName: 'Vendas',
            date: '2026-01-04T09:15:00-03:00',
            category: ExpenseCategory.TRANSPORT,
            amount: 750.00,
            currency: CurrencyCode.USD,
            description: 'Uber para reunião',
            receiptUrl: 'https://example.com/receipt/2',
            createdAt: '2026-01-04T15:30:00Z',
            status: ExpenseStatus.PENDING
        },
        {
            id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
            employeeId: 'a3456789-01bc-def1-2345-6789abcdef01',
            employeeName: 'Maria Oliveira',
            departmentName: 'RH',
            date: '2026-01-03T12:00:00-03:00',
            category: ExpenseCategory.MEAL,
            amount: 375.25,
            currency: CurrencyCode.BRL,
            description: 'Coffee break equipe',
            receiptUrl: 'https://example.com/receipt/3',
            createdAt: '2026-01-03T18:45:00Z',
            status: ExpenseStatus.PENDING
        },
        {
            id: 'd4e5f6a7-b8c9-0123-def1-234567890123',
            employeeId: 'b4567890-12cd-ef12-3456-789abcdef012',
            employeeName: 'Rafaela Santos',
            departmentName: 'TI',
            date: '2025-12-28T08:00:00-03:00',
            category: ExpenseCategory.TRAVEL,
            amount: 23000.00,
            currency: CurrencyCode.EUR,
            description: 'Viagem para conferência em São Paulo',
            receiptUrl: 'https://example.com/receipt/4',
            createdAt: '2025-12-20T11:20:00Z',
            status: ExpenseStatus.PENDING
        },
        {
            id: 'e5f6a7b8-c9d0-1234-ef12-345678901234',
            employeeId: 'c5678901-23de-f123-4567-89abcdef0123',
            employeeName: 'Pedro Costa',
            departmentName: 'Operações',
            date: '2026-01-02T16:45:00-03:00',
            category: ExpenseCategory.OTHER,
            amount: 1000.00,
            currency: CurrencyCode.BRL,
            description: 'Material de escritório',
            receiptUrl: 'https://example.com/receipt/5',
            createdAt: '2026-01-02T20:10:00Z',
            status: ExpenseStatus.PENDING
        }
    ]

    const [pendingApprovals] = useState<ExpenseResponse[]>(mockApprovals)

    return (
        <TableContainer component={Card} sx={{ maxWidth: 900 }}>
            <Table sx={{ minWidth: 350 }} size="medium" aria-label="pending approvals table">
                <TableHead>
                    <TableRow sx={{ bgcolor: 'error.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 'medium' }}>Employee</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'medium' }}>Department</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'medium' }}>Category</TableCell>
                        <TableCell align="right" sx={{ color: 'white', fontWeight: 'medium' }}>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pendingApprovals.map((approval) => (
                        <TableRow key={approval.id}>
                            <TableCell>
                                {approval.employeeName}
                            </TableCell>
                            <TableCell>
                                {approval.departmentName}
                            </TableCell>
                            <TableCell>
                                {approval.category}
                            </TableCell>
                            <TableCell align="right">
                                {approval.amount.toFixed(2)} ({approval.currency})
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}