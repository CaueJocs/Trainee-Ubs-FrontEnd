import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import CloseIcon from "@mui/icons-material/Close";

export type UserProfile = {
  name: string;
  email: string;
  manager: string;
  area: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  profile: UserProfile;
};

export function UserProfileDialog({ open, onClose, profile }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0,0,0,0.10)" }}
      >
        <Toolbar>
          <Typography sx={{ flex: 1, fontWeight: 600 }}>Profile</Typography>
          <IconButton edge="end" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          }}
        >
          <TextField label="Name" value={profile.name} size="small" InputProps={{ readOnly: true }} />
          <TextField label="Email" value={profile.email} size="small" InputProps={{ readOnly: true }} />
          <TextField label="Manager" value={profile.manager} size="small" InputProps={{ readOnly: true }} />
          <TextField label="Area" value={profile.area} size="small" InputProps={{ readOnly: true }} />
        </Box>
      </Box>
    </Dialog>
  );
}
