import { useState, useCallback, useEffect } from "react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

import ubsLogo from "@/assets/images/ubs-logo.svg";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import LogoutIcon from "@mui/icons-material/Logout";

import { LanguageDropdown } from "@/components/layout/LanguageDropdown";
import { AlertsList } from "@/components/layout/AlertsList";
import { UserProfileDialog } from "@/components/ui/Modal/Access/UserProfileDialog";
import { ResetPasswordDialog, type ResetPasswordForm } from "@/components/ui/Modal/Access/ResetPasswordDialog";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/pages/Auth/useAuth";
import { AuthService } from "@/services/AuthService";
import { AlertsService } from "@/services/AlertsService";
import { Role } from "@/enums/Role";
import type { AlertResponse } from "@/interfaces/Alerts";
import { Badge } from "@mui/material";

type HeaderVariant = "default" | "login";

type HeaderProps = {
  variant?: HeaderVariant;
  onSignOut?: () => void;
};

export function Header({
  variant = "default",
  onSignOut,
}: HeaderProps) {
  const { t } = useI18n();

  // navbar permissions
  const { canAccess } = useAuth();

  // Alerts state
  const [alerts, setAlerts] = useState<AlertResponse[] | null>(null);

  // Modal states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

  // Load alerts on mount for FINANCE users and refresh every 15 minutes
  useEffect(() => {
    const fetchAlerts = () => {
      if (canAccess([Role.FINANCE])) {
        AlertsService.getUnresolvedAlerts().then((data) => {
          setAlerts(data);
        });
      }
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 900000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notifications menu
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const isNotifOpen = Boolean(notifAnchorEl);

  const openNotifications = useCallback((e: MouseEvent<HTMLButtonElement>) =>
    setNotifAnchorEl(e.currentTarget), []);
  const closeNotifications = useCallback(() => setNotifAnchorEl(null), []);

  // Account menu
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
  const isAccountOpen = Boolean(accountAnchorEl);

  const openAccountMenu = useCallback((e: MouseEvent<HTMLButtonElement>) =>
    setAccountAnchorEl(e.currentTarget), []);
  const closeAccountMenu = useCallback(() => setAccountAnchorEl(null), []);

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const handleProfile = () => {
    closeAccountMenu();
    setIsProfileOpen(true);
  };

  const handleResetPasswordClick = () => {
    closeAccountMenu();
    setIsResetOpen(true);
  };

  const handleResetPassword = async (values: ResetPasswordForm): Promise<boolean> => {
    const success = await AuthService.changePassword(values.currentPassword, values.newPassword);

    if (success) {
      showSnackbar(t("resetPassword.success"), "success");
      return true;
    } else {
      showSnackbar(t("resetPassword.error"), "error");
      return false;
    }
  };

  const handleSignOut = useCallback(() => {
    closeAccountMenu();
    onSignOut?.();
    AuthService.logout();
  }, [closeAccountMenu, onSignOut]);

  if (variant === "login") {
    return (
      <header className="border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          {/* Left */}
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={ubsLogo}
              alt="UBS"
              className="h-6 w-auto"
              draggable={false}
            />

            {/* Em telas pequenas, esconde o texto (fica só o logo) */}
            <span className="hidden truncate text-lg font-medium sm:inline">
              ExpenseManager
            </span>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-4">
            <LanguageDropdown />
          </div>
        </div>

        <div className="h-px bg-black/15" />
      </header>
    );
  }

  return (
    <>
    <header className="border-t bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6">
        {/* Linha 1: logo + ícones */}
        <div className="flex h-14 items-center justify-between">
          <Link to="/home" aria-label="Go to home">
            <img
              src={ubsLogo}
              alt="UBS"
              className="h-8 w-auto cursor-pointer opacity-100 hover:opacity-70"
              draggable={false}
            />
          </Link>

          <div className="flex items-center gap-4">

            <div className="flex shrink-0 items-center gap-4">
              <LanguageDropdown />
            </div>

            {/* Notifications */}
            {canAccess([Role.FINANCE]) && (
            <button
              type="button"
              aria-label={t("header.notifications")}
              onClick={openNotifications}
            >
              <Badge 
                badgeContent={alerts?.length || 0} 
                color="error"
                max={99}
                variant="dot"
              >
                <NotificationsIcon className="h-7 w-7 cursor-pointer text-[var(--ubs-coal)] hover:text-black" />
              </Badge>
            </button>
            )}

            <AlertsList
              anchorEl={notifAnchorEl}
              open={isNotifOpen}
              onClose={closeNotifications}
              alerts={alerts}
            />

            {/* Account dropdown */}
            <button
              type="button"
              aria-label={t("header.account")}
              onClick={openAccountMenu}
            >
              <AccountBoxIcon className="h-7 w-7 cursor-pointer text-[var(--ubs-coal)] hover:text-black" />
            </button>

            <Menu
              anchorEl={accountAnchorEl}
              open={isAccountOpen}
              onClose={closeAccountMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              disableAutoFocusItem
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                {t("header.profile")}
              </MenuItem>

              <MenuItem onClick={handleResetPasswordClick}>
                <ListItemIcon>
                  <SecurityIcon fontSize="small" />
                </ListItemIcon>
                {t("header.resetPassword")}
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                {t("header.signOut")}
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Linha 2: menu */}
        <div className="flex h-10 items-center">
          <nav className="flex gap-6 text-base text-[var(--ubs-coal)]">
            {canAccess([Role.ADMIN]) && (
              <Link className="cursor-pointer hover:text-black" to="/access">
                {t("header.access")}
              </Link>
            )}
            {canAccess([Role.ADMIN]) && (
              <Link className="cursor-pointer hover:text-black" to="/departments">
                {t("header.departments")}
              </Link>
            )}
            {canAccess([Role.EMPLOYEE, Role.MANAGER, Role.FINANCE]) && (
            <Link className="cursor-pointer hover:text-black" to="/my-expenses">
              {t("header.myExpenses")}
            </Link>
            )}
            {canAccess([Role.EMPLOYEE]) && (
            <Link className="cursor-pointer hover:text-black" to="/my-expenses">
              {t("header.pendingExpenses")}
            </Link>
            )}
            {canAccess([Role.EMPLOYEE]) && (
            <Link className="cursor-pointer hover:text-black" to="/my-expenses">
              {t("header.approvedExpenses")}
            </Link>
            )}
            {canAccess([Role.MANAGER, Role.FINANCE]) && (
            <Link className="cursor-pointer hover:text-black" to="/my-approvals">
              {t("header.approvals")}
            </Link>
            )}
            {canAccess([Role.FINANCE]) && (
            <Link className="cursor-pointer hover:text-black" to="/budget">
              {t("header.budget")}
            </Link>
            )}
            {canAccess([Role.FINANCE]) && (
            <Link className="cursor-pointer hover:text-black" to="/reports">
              {t("header.reports")}
            </Link>
            )}
          </nav>
        </div>
      </div>

      <div className="h-px bg-black/15" />
    </header>

    {/* Modals */}
    <UserProfileDialog
      open={isProfileOpen}
      onClose={() => setIsProfileOpen(false)}
      onShowSnackbar={showSnackbar}
    />

    <ResetPasswordDialog
      open={isResetOpen}
      onClose={() => setIsResetOpen(false)}
      onSave={handleResetPassword}
    />

    {/* Snackbar */}
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
    </>
  );
}