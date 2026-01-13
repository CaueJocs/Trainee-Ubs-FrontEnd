import { useEffect, useMemo, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (payload: { departmentName: string; currency: string }) => void;
  currencies: string[];
};

export function CreateDepartmentModal({ open, onClose, onSave, currencies }: Props) {
  const [departmentName, setDepartmentName] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    if (open) {
      setDepartmentName("");
      setCurrency("");
    }
  }, [open]);

  const currencyOptions = useMemo(() => currencies.slice().sort(), [currencies]);

  const canSave = Boolean(departmentName.trim()) && Boolean(currency);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create department</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1, display: "grid", gap: 2 }}>
          <TextField
            label="Department"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            size="small"
            autoFocus
          />

          <FormControl size="small">
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(String(e.target.value))}
            >
              {currencyOptions.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={() => onSave({ departmentName: departmentName.trim(), currency })}
          variant="contained"
          color="error"
          disabled={!canSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
