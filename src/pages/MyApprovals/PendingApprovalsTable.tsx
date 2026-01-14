import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import type { ExpenseResponse } from "@/interfaces/Expense";
import { ApproveExpenseModal } from "../../components/ui/Modal/ModalExpense/ApproveExpenseModal";

export function PendingApprovalsTable() {
  const mockPendingApprovals: ExpenseResponse[] = [];

  const [pendingApprovals] = useState<ExpenseResponse[]>(mockPendingApprovals);

  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseResponse | null>(null);

  function handleOpenModal(approval: ExpenseResponse) {
    setSelectedExpense(approval);
  }

  function handleCloseModal() {
    setSelectedExpense(null);
  }

  return (
    <>
      <TableContainer
        component={Card}
        sx={{
          maxWidth: 900,
          maxHeight: { xs: "70vh", lg: "50vh" },
          overflow: "auto",
        }}
      >
        <Table
          sx={{ minWidth: 350, minHeight: { xs: "70vh", lg: "auto" } }}
          size="medium"
          stickyHeader
          aria-label="pending approvals table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ bgcolor: "var(--ubs-midnight)", color: "white" }}
              >
                Employee
              </TableCell>
              <TableCell
                sx={{ bgcolor: "var(--ubs-midnight)", color: "white" }}
              >
                Department
              </TableCell>
              <TableCell
                sx={{ bgcolor: "var(--ubs-midnight)", color: "white" }}
              >
                Category
              </TableCell>
              <TableCell
                align="right"
                sx={{ bgcolor: "var(--ubs-midnight)", color: "white" }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingApprovals.map((approval) => (
              <TableRow
                key={approval.id}
                onClick={() => handleOpenModal(approval)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <TableCell>{approval.employeeId}</TableCell>
                <TableCell>{approval.departmentName}</TableCell>
                <TableCell>{approval.category}</TableCell>
                <TableCell align="right">
                  {approval.amount.toFixed(2)} ({approval.currency})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedExpense && (
        <ApproveExpenseModal
          payload={selectedExpense}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
