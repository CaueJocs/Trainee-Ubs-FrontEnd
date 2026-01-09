import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { UserProfileDialog, type UserProfile } from "./UserProfileDialog";
import { ResetPasswordDialog } from "./ResetPasswordDialog";

type ExpenseRow = {
  id: number;
  name: string;
  description: string;
  expenseType: string;
  expenseDate: string;
  expenseCost: number;
  expenseStatus: string;
};

function ExpensesToolbar({ onNewExpense }: { onNewExpense: () => void }) {
  return (
    <GridToolbarContainer
      sx={{
        px: 2,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        backgroundColor: "#F2F2F7",
        borderRadius: "2px",
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.70)" }}>
        My expenses
      </Typography>

      <Button
        onClick={onNewExpense}
        variant="contained"
        color="error"
        size="small"
        sx={{ borderRadius: "16px", textTransform: "none" }}
      >
        New expense
      </Button>
    </GridToolbarContainer>
  );
}

export function Expenses() {
  const navigate = useNavigate();

  // 🔹 mock de dados (troca depois pela API)
  const rows = useMemo<ExpenseRow[]>(
    () => [
      {
        id: 1,
        name: "Jose Silva",
        description: "Lunch - client meeting",
        expenseType: "Meal",
        expenseDate: "2026-01-08",
        expenseCost: 85.5,
        expenseStatus: "Pending",
      },
    ],
    []
  );

  const columns = useMemo<GridColDef<ExpenseRow>[]>(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "name", headerName: "Name", minWidth: 160, flex: 1 },
      { field: "description", headerName: "Description", minWidth: 200, flex: 1 },
      { field: "expenseType", headerName: "Expense type", minWidth: 160, flex: 1 },
      { field: "expenseDate", headerName: "Expense date", minWidth: 160, flex: 1 },
      {
        field: "expenseCost",
        headerName: "Expense cost",
        minWidth: 160,
        flex: 1,
        valueFormatter: (v) => {
          const n = Number(v ?? 0);
          return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
        },
      },
      { field: "expenseStatus", headerName: "Expense status", minWidth: 160, flex: 1 },
    ],
    []
  );

  // 🔹 Profile (abre pelo dropdown do header)
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profile = useMemo<UserProfile>(
    () => ({
      name: "Jose Silva",
      email: "jose.silva@ubs.com",
      manager: "Leandro Andrade",
      area: "LFG",
    }),
    []
  );

  // 🔹 Reset password (modal central)
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleSignOut = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenResetPassword={() => setIsResetOpen(true)}
        onSignOut={handleSignOut}
      />

      <main className="flex-1 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Box sx={{ mt: 3 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 5 } },
              }}
              slots={{
                toolbar: () => <ExpensesToolbar onNewExpense={() => console.log("new expense")} />,
              }}
              sx={{
                mt: 2,
                border: "none",
                "& .MuiDataGrid-columnSeparator": { display: "none" },

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#D9D9D9",
                  borderBottom: "1px solid rgba(0,0,0,0.10)",
                },

                "& .MuiDataGrid-row": {
                  backgroundColor: "#F2F2F7",
                  borderTop: "1px solid rgba(0,0,0,0.10)",
                },

                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid rgba(0,0,0,0.10)",
                },
              }}
            />
          </Box>

          <div className="h-16" />
        </div>
      </main>

      <Footer />

      <UserProfileDialog
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
      />

      <ResetPasswordDialog
        open={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onSave={(values) => console.log("reset password submit", values)}
      />
    </div>
  );
}
