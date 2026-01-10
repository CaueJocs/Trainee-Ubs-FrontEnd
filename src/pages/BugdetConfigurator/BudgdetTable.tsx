import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { BudgetModal } from "./BugdetModal";

interface areaBugdetResponse {
  areaName: string;
  monthlyBudget: number;
}

const columns: GridColDef[] = [
  {
    field: "areaName",
    headerName: "Area",
    flex: 1,
  },
  {
    field: "monthlyBudget",
    headerName: "Monthly Budgdet",
    type: "number",
    flex: 1,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function BudgdetTable() {
  const [rows, setRows] = useState<areaBugdetResponse[]>([
    {
      id: 1,
      areaName: "Marketing",

      monthlyBudget: 120000,
    },
    {
      id: 2,
      areaName: "Engineering",

      monthlyBudget: 300000,
    },
    {
      id: 3,
      areaName: "Sales",

      monthlyBudget: 180000,
    },
    {
      id: 4,
      areaName: "Human Resources",

      monthlyBudget: 60000,
    },
    {
      id: 5,
      areaName: "Finance",

      monthlyBudget: 90000,
    },
    {
      id: 6,
      areaName: "Customer Support",

      monthlyBudget: 75000,
    },
    {
      id: 7,
      areaName: "Product",

      monthlyBudget: 150000,
    },
    {
      id: 8,
      areaName: "Operations",

      monthlyBudget: 110000,
    },
    {
      id: 9,
      areaName: "Legal",

      monthlyBudget: 50000,
    },
    {
      id: 10,
      areaName: "IT Infrastructure",

      monthlyBudget: 130000,
    },
  ]);

  const [selectedArea, setSelectedArea] = useState<areaBugdetResponse | null>(
    null
  );

  function handleOpenModal(area: areaBugdetResponse) {
    setSelectedArea(area);
  }

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        onRowClick={(params) => handleOpenModal(params.row)}
      />

      {selectedArea && (
        <BudgetModal
          open
          payload={{
            areaName: selectedArea.areaName,
            areaBudget: selectedArea.monthlyBudget,
          }}
          onClose={() => setSelectedArea(null)}
        />
      )}
    </Paper>
  );
}
