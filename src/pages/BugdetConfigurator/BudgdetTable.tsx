import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { DepartmentService } from "@/services/DepartmentService";
import type { DepartmentResponse } from "@/interfaces/Department";
import { BudgetModal } from "./BugdetModal";

const columns: GridColDef<DepartmentResponse>[] = [
  { field: "name", headerName: "Area", flex: 1 },
  {
    field: "currency",
    headerName: "Currency",
    flex: 0,
    minWidth: 75,
    align: "center",
    headerAlign: "center",
  }
];

export default function BudgdetTable() {
  const [rows, setRows] = useState<DepartmentResponse[]>([]);
  const [selectedArea, setSelectedArea] = useState<DepartmentResponse | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;
    DepartmentService.getDepartments().then((list) => {
      if (cancelled) return;
      setRows(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleOpenModal(area: DepartmentResponse) {
    setSelectedArea(area);
  }

  return (
    <div className="w-full">
      <DataGrid
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        getRowId={(row) => row.name}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }],
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        sx={{ mt: 2, overflow: "auto", height: "60vh" }}
        onRowClick={(params) => handleOpenModal(params.row)}
      />

      {selectedArea && (
        <BudgetModal
          open
          payload={{
            areaName: selectedArea.name,
            areaBudget: selectedArea.monthlyBudget,
          }}
          onClose={() => setSelectedArea(null)}
        />
      )}
    </div>
  );
}
