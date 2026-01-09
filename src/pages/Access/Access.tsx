import { useCallback, useMemo, useState } from "react";

import { Plus, Pencil, XCircle } from "lucide-react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import type { GridColDef, GridRowId } from "@mui/x-data-grid";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { NewUserModal, type NewUserForm } from "./NewUserModal";
import { EditUserDialog, type AccessRow } from "./EditUserDialog";

const INITIAL_ROWS: AccessRow[] = [
  {
    id: 1395,
    name: "Jose Silva",
    email: "jose.silva@ubs.com",
    manager: "Leandro Andrade",
    area: "LFG",
  },
];

export function Access() {
  const [rows, setRows] = useState<AccessRow[]>(INITIAL_ROWS);

  // Add user modal
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const openNewUser = useCallback(() => setIsNewUserOpen(true), []);
  const closeNewUser = useCallback(() => setIsNewUserOpen(false), []);

  // Edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<AccessRow | null>(null);

  const openEdit = useCallback((row: AccessRow) => {
    setEditingRow(row);
    setIsEditOpen(true);
  }, []);

  const closeEdit = useCallback(() => {
    setIsEditOpen(false);
    setEditingRow(null);
  }, []);

  const handleDelete = useCallback((id: GridRowId) => {
    const numericId = Number(id);
    setRows((prev) => prev.filter((r) => r.id !== numericId));
  }, []);

  const handleSaveNew = useCallback(
    (mode: "save" | "saveAndCreate", values: NewUserForm) => {
      setRows((prev) => {
        const maxId = prev.reduce((acc, r) => Math.max(acc, r.id), 0);
        const nextId = maxId + 1;

        const newRow: AccessRow = {
          id: nextId,
          name: values.name,
          email: values.email,
          manager: values.manager,
          area: values.area,
        };

        return [...prev, newRow];
      });

      // fechamento/reset é controlado pelo componente NewUserModal
      // (ele fecha no "save" e mantém aberto no "saveAndCreate")
      void mode;
    },
    []
  );

  const handleSaveEdit = useCallback((updated: AccessRow) => {
    setRows((prev) => {
      const currentId = editingRow?.id;

      // Se o usuário alterou o ID, validar duplicidade
      if (currentId != null && updated.id !== currentId) {
        const exists = prev.some((r) => r.id === updated.id);
        if (exists) {
          window.alert("This Id already exists. Please choose another one.");
          return prev;
        }
      }

      return prev.map((r) => (r.id === (editingRow?.id ?? updated.id) ? updated : r));
    });
  }, [editingRow]);

  const columns = useMemo<GridColDef<AccessRow>[]>(
    () => [
      { field: "id", headerName: "Id", width: 110 },
      { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 260,
        renderCell: (params) => (
          <a
            href="#"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              textDecorationColor: "rgba(0,0,0,0.30)",
            }}
          >
            {String(params.value ?? "")}
          </a>
        ),
      },
      { field: "manager", headerName: "Manager", flex: 1, minWidth: 220 },
      { field: "area", headerName: "Area", width: 140 },
      {
        field: "actions",
        type: "actions",
        headerName: "",
        width: 140,
        sortable: false,
        filterable: false,

        // ✅ botão + no header da coluna (mesma coluna do Edit/Delete)
        renderHeader: () => (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              // deixa um espaço pro ícone do menu (3 pontinhos) não sobrepor
              pr: 4,
            }}
          >
            <Tooltip title="Add user" placement="bottom">
              <IconButton
                onClick={openNewUser}
                aria-label="Add user"
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "2px",
                  backgroundColor: "#d60000",
                  color: "white",
                  "&:hover": { backgroundColor: "#b80000" },
                }}
              >
                <Plus size={18} />
              </IconButton>
            </Tooltip>
          </Box>
        ),

        getActions: (params) => [
          <Tooltip key="edit" title="Edit" placement="bottom">
            <GridActionsCellItem
              icon={
                <Box component="span" sx={{ color: "rgba(0,0,0,0.70)" }}>
                  <Pencil size={18} />
                </Box>
              }
              label="Edit"
              onClick={() => openEdit(params.row as AccessRow)}
            />
          </Tooltip>,

          <Tooltip key="delete" title="Delete" placement="bottom">
            <GridActionsCellItem
              icon={
                <Box component="span" sx={{ color: "rgba(214,0,0,0.95)" }}>
                  <XCircle size={18} />
                </Box>
              }
              label="Delete"
              onClick={() => handleDelete(params.id)}
            />
          </Tooltip>,
        ],
      },
    ],
    [handleDelete, openEdit, openNewUser]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Box sx={{ mt: 3 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 5 } },
              }}
              sx={{
                mt: 2,
                border: "none",
                "& .MuiDataGrid-columnSeparator": { display: "none" },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#F2F2F7",
                  borderBottom: "1px solid rgba(0,0,0,0.10)",
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: "#F2F2F7",
                  borderTop: "1px solid rgba(0,0,0,0.10)",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid rgba(0,0,0,0.10)",
                },
              }}
            />
          </Box>

          <div className="h-16" />
        </div>

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
      </main>

      <Footer />
    </div>
  );
}
