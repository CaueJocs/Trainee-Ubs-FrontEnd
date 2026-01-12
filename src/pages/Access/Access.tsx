import { useCallback, useEffect, useMemo, useState } from "react";


import Switch from "@mui/material/Switch";

import {
  DataGrid,
} from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { NewUserModal, type NewUserForm } from "./NewUserModal";
import { EditUserDialog } from "./EditUserDialog";
import type { EmployeeResponse, UpdateEmployeeRequest } from "@/interfaces/Employee";
import { Button, Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";
import { EmployeeService } from "@/services/EmployeeService";

export type EmployeeRow = EmployeeResponse;

const INITIAL_ROWS: EmployeeRow[] = [];

export function Access() {
  const [rows, setRows] = useState<EmployeeRow[]>(INITIAL_ROWS);

  // Add user modal
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const openNewUser = useCallback(() => setIsNewUserOpen(true), []);
  const closeNewUser = useCallback(() => setIsNewUserOpen(false), []);

  // Edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<EmployeeRow | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

  useEffect(() => {
    let cancelled = false;
    EmployeeService.getAllEmployees().then((list) => {
      if (cancelled) return;
      setRows(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const openEdit = useCallback((params: { row: EmployeeRow }) => {
    setEditingRow(params.row);
    setIsEditOpen(true);
  }, []);

  const closeEdit = useCallback(() => {
    setIsEditOpen(false);
    setEditingRow(null);
  }, []);

  const handleDeactivateEmployee = useCallback((employeeId: string) => {
    // WIP - Integrate Activate/Deactivate API
    console.log(`Employee deactivated\n ${employeeId}`);
    setRows((prev) =>
      prev.map((r) => (String(r.id) === String(employeeId) ? { ...r, active: false } : r))
    );
  }, []);

  const handleActivateEmployee = useCallback((employeeId: string) => {
    // WIP - Integrate Activate/Deactivate API
    console.log(`Employee activated\n ${employeeId}`);
    setRows((prev) =>
      prev.map((r) => (String(r.id) === String(employeeId) ? { ...r, active: true } : r))
    );
  }, []);

  const handleSaveNew = useCallback(
    async (mode: "save" | "saveAndCreate", values: NewUserForm) => {
      const result = await EmployeeService.createEmployee(values);

      if (result) {
        // Add new employee to rows from server response
        setRows((prev) => [...prev, result]);
        // Show success notification
        setSnackSeverity("success");
        setSnackMessage("Employee created successfully.");
        setSnackOpen(true);
        return true;
      } else {
        // Show error notification
        setSnackSeverity("error");
        setSnackMessage("Failed to create employee.");
        setSnackOpen(true);
        return false;
      }
    },
    []
  );

  const handleSaveEdit = useCallback(async (updated: EmployeeRow) => {
    const payload: UpdateEmployeeRequest = {
      name: updated.name,
      email: updated.email,
      departmentName: updated.departmentName,
      position: updated.position ?? "",
      managerId: updated.managerId ?? "",
      role: updated.role,
      active: updated.active,
    };

    const result = await EmployeeService.putEmployee(String(updated.id), payload);

    if (result) {
      // Update rows with server response to ensure data consistency
      setRows((prev) =>
        prev.map((r) => (String(r.id) === String(updated.id) ? result : r))
      );
      // Show success notification
      setSnackSeverity("success");
      setSnackMessage("Employee updated successfully.");
      setSnackOpen(true);
      return true;
    } else {
      // Show error notification
      setSnackSeverity("error");
      setSnackMessage("Failed to update employee.");
      setSnackOpen(true);
      return false;
    }
  }, []);

  const columns = useMemo<GridColDef<EmployeeRow>[]>(
    () => [
      { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
      { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
      { field: "position", headerName: "Position", flex: 1, minWidth: 150 },
      { field: "departmentName", headerName: "Department", flex: 1, minWidth: 150 },
      { field: "role", headerName: "Role", flex: 1, minWidth: 150 },
      {
        field: "active",
        headerName: "Active",
        flex: 0,
        minWidth: 100,
        renderCell: (params) => (
          <Switch
            checked={Boolean(params.value)}
            onChange={(event) => {
              const checked = event.target.checked;
              if(checked) {
                handleActivateEmployee(params.row.id);
              } else {
                handleDeactivateEmployee(params.row.id);
              }
            }}
            color="secondary"
          />
        ),
      },
    ],
    [handleActivateEmployee, handleDeactivateEmployee]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-full h-auto">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            Access
          </h1>
          <Button variant="contained" sx={{bgcolor: "var(--ubs-red)" , ml: 2}} onClick={() => openNewUser()}>New User</Button>  
          <section className="p-2 sm:p-4">
              <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={openEdit}
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 10 } },
                  sorting: {
                  sortModel: [
                    { field: "departmentName", sort: "asc" }
                  ]
                }
                }}
                autoHeight={false}
                sx={{ mt: 2, overflow: "auto", height: "60vh" }}
              />
          </section>
        </div>
      </main>

        {/* ✅ New user (modal central) */}
        <NewUserModal
          open={isNewUserOpen}
          onClose={closeNewUser}
          onSave={handleSaveNew}
        />

        {/* ✅ Edit user (modal central) */}
        <EditUserDialog
          open={isEditOpen}
          user={editingRow}
          onClose={closeEdit}
          onSave={handleSaveEdit}
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

      <Footer />
    </div>
  );
}
