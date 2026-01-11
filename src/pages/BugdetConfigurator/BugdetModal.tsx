import {
  Button,
  Dialog,
  TextField,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { ExpenseCategory } from "@/enums/ExpenseCategory";
import AddIcon from "@mui/icons-material/Add";
import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface ModalPayload {
  areaName: string;
  areaBudget: number;
}

interface Props {
  open: boolean;
  payload: ModalPayload;
  onClose: () => void;
}

type RowError = {
  expenseTypeName?: boolean;
  budgetType?: boolean;
  budgetValue?: boolean;
};

const columns: GridColDef[] = [
  {
    field: "expenseTypeName",
    headerName: "Name",
    flex: 1,
    editable: true,
    type: "singleSelect",
    valueOptions: Object.values(ExpenseCategory),
  },
  {
    field: "budgetType",
    headerName: "Budget type",
    flex: 1,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Monthly", "Daily"],
  },
  {
    field: "budgetValue",
    headerName: "Budget Value",
    flex: 1,
    editable: true,
  },
];

export function BudgetModal({ open, payload, onClose }: Props) {
  const apiRef = useGridApiRef();

  const previousAreaMonthlyBudget = payload.areaBudget;

  const [, forceRender] = useState(0);


  const [rows, setRows] = useState([
    {
      id: 1,
      expenseTypeName: "Comida",
      budgetType: "Monthly",
      budgetValue: 123123,
      isNew: false,
    },
  ]);

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((row) => row.id)) + 1,
        expenseTypeName: "Add",
        budgetType: "Add",
        budgetValue: 0,
        isNew: true,
      },
    ]);
  };

  const handleDeleteRow = () => {
    if (apiRef.current === null) return;
    const selectedIds = Array.from(apiRef.current.getSelectedRows().keys());

    if (selectedIds.length === 0) return;

    setRows((prev) => prev.filter((row) => !selectedIds.includes(row.id)));

    apiRef.current.setRowSelectionModel([]);
  };

  const newRows = rows.filter((row) => row.isNew);

  const handleSave = () => {
    console.log(newRows);
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
          <div className=" flex gap-2">
            <Badge
              badgeContent={apiRef.current?.getSelectedRows().size || 0}
              color="primary"
            >
              <Tooltip title="Delete selected rows">
                <IconButton
                  sx={{
                    bgcolor: "var(--ubs-gray)",
                    color: "#fff",
                    borderRadius: 1,
                  }}
                  onClick={handleDeleteRow}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Badge>
            <Tooltip title="Add new row">
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
            </Tooltip>
          </div>
        </div>
        <DataGrid
          apiRef={apiRef}
          checkboxSelection
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          onRowSelectionModelChange={() => {
            forceRender((n) => n + 1);
          }}
        />
      </div>
      <div className="flex justify-end gap-2 p-4">
        <Button sx={{ bgcolor: "var(--ubs-gray)" }}>Cancel</Button>
        <Button
          sx={{
            bgcolor: "var(--ubs-red)",
            color: "#fff",
            "&.Mui-disabled": {
              bgcolor: "var(--ubs-gray)",
              color: "#aaa",
            },
          }}
          onClick={handleSave}
          disabled={newRows.length === 0}
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
}
