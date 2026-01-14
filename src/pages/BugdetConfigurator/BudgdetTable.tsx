import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { DepartmentService } from "@/services/DepartmentService";
import type { DepartmentDetailedResponse, DepartmentResponse } from "@/interfaces/Department";
import { BudgetModal } from "./BugdetModal";
import { Alert, Snackbar } from "@mui/material";

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
  const [selectedArea, setSelectedArea] = useState<DepartmentResponse | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDetailedResponse | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");

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

  async function handleOpenModal(area: DepartmentResponse) {
    setSelectedArea(area);
    const detailedDepartment = await DepartmentService.getDepartment(area.name);
    setSelectedDepartment(detailedDepartment);
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

        {selectedArea && selectedDepartment && (
          <BudgetModal
            open
            department={selectedDepartment}
            onClose={() => {
              setSelectedArea(null);
              setSelectedDepartment(null);
            }}
            onSaved={(success: boolean) => {
              setSnackSeverity(success ? "success" : "error");
              setSnackMessage(success ? "Orçamento salvo com sucesso!" : "Falha ao salvar orçamento.");
              setSnackOpen(true);
            }}
          />
        )}

        <Snackbar
          open={snackOpen}
          autoHideDuration={5000}
          onClose={(_: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === "clickaway") return;
            setSnackOpen(false);
          }}
        >
          <Alert
            onClose={() => setSnackOpen(false)}
            severity={snackSeverity}
            sx={{ width: "100%" }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
    </div>
  );
}
