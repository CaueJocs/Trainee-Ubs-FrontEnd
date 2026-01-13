import Dialog from "@mui/material/Dialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Button } from "@mui/material";

import { useState } from "react";

import { ResetPasswordDialog } from "./ResetPasswordDialog";
import { AuthService } from "@/services/AuthService";


type Props = {
  open: boolean;
  onClose: () => void;
};

export function UserProfileDialog({ open, onClose }: Props) {
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  
  const user = AuthService.getUser();
  
  function handleResetPassword() {
    setResetPasswordOpen(true);
  }
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box
        sx={{
          p: 3,
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 80 }} />
          <h1>Profile</h1>
        </Box>

        
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            width: "100%",
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            flexGrow: 1,
          }}
        >
          <TextField
            label="Name"
            value={user?.name || ""}
            size="medium"
            disabled
          />
          <TextField
            label="Email"
            value={user?.email || ""}
            size="medium"
            disabled
          />
          <TextField
            label="Department"
            value={user?.departmentName || ""}
            size="medium"
            disabled
          />
          <TextField
            label="Role"
            value={user?.role || ""}
            size="medium"
            disabled
          />
        </Box>

        
        <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 2 }}>
          <Button sx={{ bgcolor: "var(--ubs-charcoal)", color: "white" }} onClick={onClose}>Cancel</Button>
          <Button sx={{ bgcolor: "var(--ubs-red)", color: "white" }} endIcon={<LockResetIcon />} onClick={handleResetPassword}>Reset Password</Button>
        </Box>
      </Box>

      {resetPasswordOpen && (
        <ResetPasswordDialog
          open={resetPasswordOpen}
          onClose={() => setResetPasswordOpen(false)}
        />
      )}
                
    </Dialog>
  );
}
