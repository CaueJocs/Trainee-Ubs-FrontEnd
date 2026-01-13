import { useCallback, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import { CreateDepartmentModal } from "./CreateDepartmentModal";
import { RenameDepartmentModal } from "./RenameDepartmentModal";

export type DepartmentRow = {
  id: number;
  departmentName: string;
  currency: string; // ISO 4217 (ex: BRL, EUR)
};

const paginationModel = { page: 0, pageSize: 5 };

// tenta pegar "todas" as moedas suportadas pelo ambiente
function getAllCurrencies(): string[] {
  const supportedValuesOf = (Intl as any)?.supportedValuesOf as
    | ((key: string) => string[])
    | undefined;

  if (supportedValuesOf) {
    // normalmente retorna uma lista bem grande (ISO 4217 suportadas)
    return supportedValuesOf("currency");
  }

  // fallback curto (se browser/TS não suportar supportedValuesOf)
  return ["USD", "EUR", "BRL", "CHF", "GBP", "JPY", "CAD", "AUD"];
}

export function Departments() {
  const [rows, setRows] = useState<DepartmentRow[]>([
    { id: 1, departmentName: "Sales", currency: "BRL" },
    { id: 2, departmentName: "Customer Support", currency: "BRL" },
    { id: 3, departmentName: "Finance", currency: "CHF" },
    { id: 4, departmentName: "Marketing", currency: "EUR" },
    { id: 5, departmentName: "Human Resources", currency: "EUR" },
  ]);

  const currencies = useMemo(() => getAllCurrencies(), []);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selected, setSelected] = useState<DepartmentRow | null>(null);

  const openCreate = useCallback(() => setIsCreateOpen(true), []);
  const closeCreate = useCallback(() => setIsCreateOpen(false), []);

  const openRename = useCallback((row: DepartmentRow) => setSelected(row), []);
  const closeRename = useCallback(() => setSelected(null), []);

  const handleCreate = useCallback((payload: { departmentName: string; currency: string }) => {
    setRows((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1;
      return [
        ...prev,
        { id: nextId, departmentName: payload.departmentName, currency: payload.currency },
      ];
    });
    closeCreate();
  }, [closeCreate]);

  const handleRename = useCallback((updated: { id: number; departmentName: string }) => {
    setRows((prev) =>
      prev.map((r) => (r.id === updated.id ? { ...r, departmentName: updated.departmentName } : r))
    );
    closeRename();
  }, [closeRename]);

  const columns = useMemo<GridColDef<DepartmentRow>[]>(() => {
    return [
      {
        field: "departmentName",
        headerName: "Department",
        flex: 1,
        minWidth: 220,
      },
      {
        field: "currency",
        headerName: "Currency",
        minWidth: 220,
        flex: 1,
        align: "right",
        headerAlign: "right",
        renderHeader: () => (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Currency</Typography>

            <Tooltip title="Create department" placement="bottom">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // evita sort ao clicar no botão
                  openCreate();
                }}
                sx={{
                  bgcolor: "error.main",
                  color: "common.white",
                  borderRadius: "2px",
                  "&:hover": { bgcolor: "error.dark" },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ];
  }, [openCreate]);

  return (
    <Box className="mx-auto w-full max-w-6xl px-4 sm:px-6" sx={{ mt: 4 }}>
      <Typography sx={{ fontSize: 32, fontWeight: 300, mb: 2 }}>
        Departaments
      </Typography>

      <Paper sx={{ height: 420, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          onRowClick={(params) => openRename(params.row)}
        />
      </Paper>

      <CreateDepartmentModal
        open={isCreateOpen}
        onClose={closeCreate}
        onSave={handleCreate}
        currencies={currencies}
      />

      <RenameDepartmentModal
        open={Boolean(selected)}
        department={selected}
        onClose={closeRename}
        onSave={handleRename}
      />
    </Box>
  );
}
