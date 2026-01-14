import { useCallback, useEffect, useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Button, Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";

import { CreateDepartmentModal } from "./CreateDepartmentModal";
import { RenameDepartmentModal } from "./RenameDepartmentModal";
import { useI18n } from "@/i18n/I18nContext";
import { DepartmentService } from "@/services/DepartmentService";

export type DepartmentRow = {
  name: string;
  currency: string;
};

const INITIAL_ROWS: DepartmentRow[] = [];

export function Departments() {
  const { t } = useI18n();
  const [rows, setRows] = useState<DepartmentRow[]>(INITIAL_ROWS);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selected, setSelected] = useState<DepartmentRow | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

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

  const openCreate = useCallback(() => setIsCreateOpen(true), []);
  const closeCreate = useCallback(() => setIsCreateOpen(false), []);

  const openRename = useCallback((params: { row: DepartmentRow }) => {
    setSelected(params.row);
  }, []);
  const closeRename = useCallback(() => setSelected(null), []);

  const handleCreate = useCallback(
    async (payload: { departmentName: string; currency: string }) => {
      // TODO: Integrate with backend when API is ready
      setRows((prev) => [
        ...prev,
        { name: payload.departmentName, currency: payload.currency },
      ]);
      setSnackSeverity("success");
      setSnackMessage(t("departments.created"));
      setSnackOpen(true);
      closeCreate();
    },
    [closeCreate, t]
  );

  const handleRename = useCallback(
    async (updated: { name: string; departmentName: string }) => {
      // TODO: Integrate with backend when API is ready
      setRows((prev) =>
        prev.map((r) => (r.name === updated.name ? { ...r, name: updated.departmentName } : r))
      );
      setSnackSeverity("success");
      setSnackMessage(t("departments.updated"));
      setSnackOpen(true);
      closeRename();
    },
    [closeRename, t]
  );

  const columns = useMemo<GridColDef<DepartmentRow>[]>(
    () => [
      { field: "name", headerName: t("departments.name"), flex: 1, minWidth: 150 },
      { field: "currency", headerName: t("departments.currency"), flex: 1, minWidth: 150 },
    ],
    [t]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-full h-auto">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            {t("departments.title")}
          </h1>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--ubs-red)", ml: 2 }}
            onClick={openCreate}
          >
            {t("departments.newDepartment")}
          </Button>
          <section className="p-2 sm:p-4">
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.name}
              onRowClick={openRename}
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 10 } },
                sorting: {
                  sortModel: [{ field: "name", sort: "asc" }],
                },
              }}
              autoHeight={false}
              sx={{ mt: 2, overflow: "auto", height: "60vh" }}
            />
          </section>
        </div>
      </main>

      <CreateDepartmentModal
        open={isCreateOpen}
        onClose={closeCreate}
        onSave={handleCreate}
      />

      <RenameDepartmentModal
        open={Boolean(selected)}
        department={selected}
        onClose={closeRename}
        onSave={handleRename}
      />

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
