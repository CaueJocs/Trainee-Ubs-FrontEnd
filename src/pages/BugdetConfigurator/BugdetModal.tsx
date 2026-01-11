/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
//Some errors needed to be ignored, because there're somethings in MUI that only work with 'any' type.

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
import DeleteIcon from "@mui/icons-material/Delete";
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

type RowError = {
  expenseTypeName?: boolean;
  budgetType?: boolean;
  budgetValue?: boolean;
};


function getAvailableExpenseTypeOptions(rows, editingRowId) {
  // For each expense type, if both Monthly and Daily are present, exclude it
  const used = {};
  rows.forEach(row => {
    if (row.id === editingRowId) return; // ignore the row being edited
    if (!used[row.expenseTypeName]) used[row.expenseTypeName] = new Set();
    used[row.expenseTypeName].add(row.budgetType);
  });
  return Object.values(ExpenseCategory).filter(type => {
    return !used[type] || used[type].size < 2;
  });
}

function getAvailableBudgetTypeOptions(rows, expenseTypeName, editingRowId) {
  // For the selected expenseType, exclude budgetTypes already used (except for the row being edited)
  const used = new Set();
  rows.forEach(row => {
    if (row.id === editingRowId) return;
    if (row.expenseTypeName === expenseTypeName) {
      used.add(row.budgetType);
    }
  });
  return ["Monthly", "Daily"].filter(type => !used.has(type));
}

const columns: GridColDef[] = [
  {
    field: "expenseTypeName",
    headerName: "Name",
    flex: 1,
    editable: true,
    type: "singleSelect",
    valueOptions: (params) => getAvailableExpenseTypeOptions(params.api.getAllRowModels().toArray(), params.id),
  },
  {
    field: "budgetType",
    headerName: "Budget type",
    flex: 1,
    editable: true,
    type: "singleSelect",
    valueOptions: (params) => getAvailableBudgetTypeOptions(
      params.api.getAllRowModels().toArray(),
      params.row.expenseTypeName,
      params.id
    ),
  },
  {
    field: "budgetValue",
    headerName: "Budget Value",
    flex: 1,
    editable: true,
  },
];

export function BudgetModal({ open, payload, onClose }: Props) {
  const [, forceRender] = useState(0);
  const [newMonthlyBudget, setNewMonthlyBudget] = useState(payload.areaBudget);
  const [rowErrors, setRowErrors] = useState<Record<number, RowError>>({});
  const [expenseTypeOptions , setExpenseTypeOptions] = useState(Object.values(ExpenseCategory));
  const [budgetTypeOptions , setBudgetTypeOptions] = useState(["Monthly", "Daily"]);

  const apiRef = useGridApiRef();
  

  const [rows, setRows] = useState([
    {
      id: 1,
      expenseTypeName: "FOOD",
      budgetType: "Monthly",
      budgetValue: 123123,
      isNew: false,
    },
  ]);

  const newRows = rows.filter((row) => row.isNew);

  const validateRow = (row: any): RowError => ({
    expenseTypeName: !expenseTypeOptions.includes(row.expenseTypeName),
    budgetType: !budgetTypeOptions.includes(row.budgetType),
    budgetValue: isNaN(row.budgetValue) || row.budgetValue <= 0,
  });

  

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((r) => r.id)) + 1,
        expenseTypeName: "",
        budgetType: "",
        budgetValue: 0,
        isNew: true,
      },
    ]);
  };

  const handleDeleteRow = () => {
    if (!apiRef.current) return;

    const selectedIds = Array.from(apiRef.current.getSelectedRows().keys());

    if (!selectedIds.length) return;

    setRows((prev) => prev.filter((row) => !selectedIds.includes(row.id)));

    //Causes console error, but it's the only way to clear selection after deletion
    apiRef.current.setRowSelectionModel([]);
  };

  const handleProcessRowUpdate = (newRow: any) => {
    setRows((prev) => prev.map((row) => (row.id === newRow.id ? newRow : row)));

    const err = validateRow(newRow);

    setRowErrors((prev) => {
      const updated = { ...prev };
      if (Object.values(err).some(Boolean)) {
        updated[newRow.id] = err;
      } else {
        delete updated[newRow.id];
      }
      return updated;
    });

    return newRow;
  };

  const handleSave = () => {
    const errors: Record<number, RowError> = {};
    let hasError = false;

    newRows.forEach((row) => {
      const err = validateRow(row);
      if (Object.values(err).some(Boolean)) {
        errors[row.id] = err;
        hasError = true;
      }
    });

    setRowErrors(errors);
    if (hasError) return;

    if (newMonthlyBudget !== payload.areaBudget) {
      console.log("Updated Monthly Budget:", newMonthlyBudget);
      console.log(newRows);
    } else {
      console.log("Monthly Budget unchanged.");
      console.log(newRows);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <h1 className="text-2xl font-light tracking-tight p-5">
        {payload.areaName}&apos;s Budget
      </h1>

      <div className="bg-[var(--light-gray-bg)] m-4 p-4">
        <div className="pl-2 pt-5 pb-5">
          <TextField
            label="Monthly Budget"
            value={newMonthlyBudget}
            onChange={(e) => setNewMonthlyBudget(Number(e.target.value))}
          />
        </div>

        <div className="pl-2 pr-2 pb-2 flex justify-between">
          <h1>Expense Type budget</h1>

          <div className="flex gap-2">
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
          rows={rows}
          columns={columns}
          checkboxSelection
          autoHeight
          disableRowSelectionOnClick
          processRowUpdate={handleProcessRowUpdate}
          onRowSelectionModelChange={() => {
            forceRender((n) => n + 1);
          }}
          //Causes console error, but it's the only way to force row style update
          getRowClassName={(params) =>
            rowErrors[params.id] ? "bg-red-100" : ""
          }
        />

        {Object.keys(rowErrors).length > 0 && (
          <div className="text-red-600 text-sm mt-2">
            Please input valid data in the highlighted rows.
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 p-4">
        <Button sx={{ bgcolor: "var(--ubs-gray)" }} onClick={onClose}>
          Cancel
        </Button>
        
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
          disabled={newRows.length === 0 || Object.keys(rowErrors).length > 0}
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
}
