import {
  Menu,
  MenuItem,
  Divider,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { AlertResponse } from "@/interfaces/Alerts";
import { AlertType } from "@/enums/AlertType";
import { useI18n } from "@/i18n/I18nContext";

type AlertsListProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  alerts: AlertResponse[] | null;
};

const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case AlertType.CATEGORY_DAILY:
      return <WarningAmberIcon fontSize="small" sx={{ color: "warning.main" }} />;
    case AlertType.CATEGORY_MONTHLY:
      return <WarningAmberIcon fontSize="small" sx={{ color: "warning.main" }} />;
    case AlertType.DEPARTMENT_MONTHLY:
      return <ErrorOutlineIcon fontSize="small" sx={{ color: "error.main" }} />;
    case AlertType.MISSING_CONFIGURATION:
    default:
      return <InfoOutlinedIcon fontSize="small" sx={{ color: "info.main" }} />;
  }
};

const getAlertColor = (type: AlertType): "warning" | "error" | "info" => {
  switch (type) {
    case AlertType.CATEGORY_DAILY:
    case AlertType.CATEGORY_MONTHLY:
      return "warning";
    case AlertType.DEPARTMENT_MONTHLY:
      return "error";
    case AlertType.MISSING_CONFIGURATION:
    default:
      return "info";
  }
};

export function AlertsList({ anchorEl, open, onClose, alerts }: AlertsListProps) {
  const { t } = useI18n();

  const loading = alerts === null && open;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      slotProps={{
        paper: {
          sx: {
            maxWidth: { xs: "calc(100vw - 32px)", sm: 400 },
            maxHeight: { xs: "calc(100vh - 100px)", sm: 500 },
            width: { xs: "calc(100vw - 32px)", sm: "auto" },
          },
        },
      }}
    >
      <Typography sx={{ px: 2, pb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
        {t("header.notifications")}
        {alerts && alerts.length > 0 && (
          <Chip
            label={alerts.length}
            size="small"
            color="error"
            sx={{ height: 20, fontSize: "0.75rem" }}
          />
        )}
      </Typography>
      <Divider />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={24} />
        </Box>
      ) : !alerts || alerts.length === 0 ? (
        <MenuItem disabled>{t("header.noNotifications")}</MenuItem>
      ) : (
        alerts
        .sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((alert) => (
          <MenuItem
            key={alert.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              py: 1.5,
              px: 2,
              whiteSpace: "normal",
              minHeight: "auto",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, width: "100%" }}>
              {getAlertIcon(alert.type)}
              <Chip
                label={alert.type
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')}
                size="small"
                color={getAlertColor(alert.type)}
                sx={{ fontSize: "0.7rem", height: 20, color: "white" }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
              {alert.message}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.disabled", mt: 0.5 }}>
              {new Date(alert.createdAt).toLocaleString()}
            </Typography>
          </MenuItem>
        ))
      )}
    </Menu>
  );
}
