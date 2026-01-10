import { Button, Dialog, TextField, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

interface ModalPayload {
  areaName: string;
  areaBudget: number;
}

interface Props {
  open: boolean;
  payload: ModalPayload;
  onClose: () => void;
}

const columns: GridColDef[] = [
  { field: "expenseTypeName", headerName: "Name", flex: 1, editable: true },
  {
    field: "monthlyBudget",
    headerName: "Monthly Budget",
    flex: 1,
    editable: true,
  },
  { field: "dailyBudget", headerName: "Daily bugdet", flex: 1, editable: true },
];

export function BudgetModal({ open, payload, onClose }: Props) {
  const [rows, setRows] = useState([
    {
      id: 1,
      expenseTypeName: "Comida",
      monthlyBudget: 120000,
      dailyBudget: 123123,
    },
  ]);

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        expenseTypeName: "",
        monthlyBudget: 0,
        dailyBudget: 0,
      },
    ]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <h1 className="text-2xl font-light tracking-tight p-5">
        {payload.areaName}&apos;s Budget
      </h1>
      <div className="bg-[var(--light-gray-bg)] m-4 p-4">
        <div className="pl-2 pt-5 pb-5 flex items-center justify-between">
          <TextField label="Monthly Budget" value={payload.areaBudget} />
        </div>
        <div className="pl-2 pr-2 pb-2 flex items-center justify-between">
          <h1>Expense Type budget</h1>
          <IconButton
            sx={{
              bgcolor: "var(--ubs-red)",
              color: "#fff",
              borderRadius: 1,
            }}
            onClick={handleAddRow}
          >
            <AddIcon />
          </IconButton>
        </div>
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
        />
      </div>
      <div className="flex justify-end gap-2 p-4">
        <Button sx={{ bgcolor: "var(--ubs-gray)" }}>Clear</Button>
        <Button sx={{ bgcolor: "var(--ubs-red)" }}>Save</Button>
      </div>
    </Dialog>
  );
}
