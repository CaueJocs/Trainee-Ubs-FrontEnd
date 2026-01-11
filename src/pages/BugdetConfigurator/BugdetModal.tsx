/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */

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

// Function that updated Expense Type options to allow max 2 of each type
const getAvailableExpenseTypeOptions = (rows: any[], rowId: number) => {
  const usage = rows.reduce<Record<string, number>>((acc, row) => {
    if (!row.expenseTypeName) return acc;
    acc[row.expenseTypeName] = (acc[row.expenseTypeName] || 0) + 1;
    return acc;
  }, {});

  return Object.values(ExpenseCategory).filter((type) => {
    const count = usage[type] || 0;
    const currentRow = rows.find((r) => r.id === rowId);
    if (currentRow?.expenseTypeName === type) return true;
    return count < 2;
  });
};

// Function that updates Budget Type options to allow only one of each type per Expense Type
const getAvailableBudgetTypeOptions = (rows: any[], rowId: number) => {
  const row = rows.find((r) => r.id === rowId);
  if (!row?.expenseTypeName) return ["Monthly", "Daily"];

  const used = rows
    .filter((r) => r.expenseTypeName === row.expenseTypeName && r.id !== rowId)
    .map((r) => r.budgetType);

  return ["Monthly", "Daily"].filter((type) => !used.includes(type));
};

export function BudgetModal({ open, payload, onClose }: Props) {
  const [, forceRender] = useState(0);
  const [newMonthlyBudget, setNewMonthlyBudget] = useState(payload.areaBudget);
  const [rowErrors, setRowErrors] = useState<Record<number, RowError>>({});

  const apiRef = useGridApiRef();

  //Hardcoded initial rows for demonstration purposes
  const [rows, setRows] = useState<any[]>([
    {
      id: 1,
      expenseTypeName: "MEAL",
      budgetType: "Monthly",
      budgetValue: 123123,
      isNew: false,
    },
  ]);

  const newRows = rows.filter((row) => row.isNew);

  //Sets errors if the user doesn't fill the row correctly
  const validateRow = (row: any): RowError => ({
    expenseTypeName: !row.expenseTypeName,
    budgetType: !row.budgetType,
    budgetValue: isNaN(row.budgetValue) || row.budgetValue <= 0,
  });

  const columns: GridColDef[] = [
    {
      field: "expenseTypeName",
      headerName: "Name",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: (params) =>
        getAvailableExpenseTypeOptions(rows, params.id as number),
    },
    {
      field: "budgetType",
      headerName: "Budget type",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: (params) =>
        getAvailableBudgetTypeOptions(rows, params.id as number),
    },
    {
      field: "budgetValue",
      headerName: "Budget Value",
      flex: 1,
      editable: true,
    },
  ];

  //Adds new empty row to be filled
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

  //Deletes all checkboxed rows
  const handleDeleteRow = () => {
    if (!apiRef.current) return;

    const selectedIds = Array.from(apiRef.current.getSelectedRows().keys());
    if (!selectedIds.length) return;

    setRows((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    apiRef.current.setRowSelectionModel([]);
  };

  //Updates row data and validates it
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
      console.log(`Updated monthly budget to: ${newMonthlyBudget}`);
      console.log(newRows);
    } else {
      console.log("No changes to monthly budget.");
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
          {/* TextField to update the area's monthly budget */}
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
          onRowSelectionModelChange={() => forceRender((n) => n + 1)}
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
