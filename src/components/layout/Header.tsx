import { useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

import ubsLogo from "@/assets/images/ubs-logo.svg";
import userIcon from "@/assets/images/user-icon.png";
import bellIcon from "@/assets/images/bell-icon.png";

import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import { LanguageDropdown } from "@/components/layout/LanguageDropdown";

type HeaderVariant = "default" | "login";

type HeaderProps = {
  variant?: HeaderVariant;

  // dropdown (novo padrão)
  onOpenProfile?: () => void;
  onOpenResetPassword?: () => void;
  onSignOut?: () => void;
};

export function Header({
  variant = "default",
  onOpenProfile,
  onSignOut,
}: HeaderProps) {
  // Notifications (placeholder)
  const notifications = useMemo<string[]>(() => [], []);

  // Notifications menu
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const isNotifOpen = Boolean(notifAnchorEl);

  const openNotifications = (e: MouseEvent<HTMLButtonElement>) =>
    setNotifAnchorEl(e.currentTarget);
  const closeNotifications = () => setNotifAnchorEl(null);

  // Account menu
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
  const isAccountOpen = Boolean(accountAnchorEl);

  const openAccountMenu = (e: MouseEvent<HTMLButtonElement>) =>
    setAccountAnchorEl(e.currentTarget);
  const closeAccountMenu = () => setAccountAnchorEl(null);

  const handleProfile = () => {
    closeAccountMenu();
    onOpenProfile?.();
  };

  const handleSignOut = () => {
    closeAccountMenu();
    onSignOut?.();
  };

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
            {/* Notifications */}
            <Tooltip title="Notifications" placement="bottom">
              <button
                type="button"
                aria-label="Open notifications"
                onClick={openNotifications}
                className="opacity-70 hover:opacity-100"
              >
                <img
                  src={bellIcon}
                  alt="notifications"
                  className="h-7 w-7 cursor-pointer"
                  draggable={false}
                />
              </button>
            </Tooltip>

            <Menu
              anchorEl={notifAnchorEl}
              open={isNotifOpen}
              onClose={closeNotifications}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Typography sx={{ px: 2, pt: 1.5, pb: 0.5, fontWeight: 600 }}>
                Notifications
              </Typography>
              <Divider />

              {notifications.length === 0 ? (
                <MenuItem disabled>No notifications yet</MenuItem>
              ) : (
                notifications.map((n, i) => <MenuItem key={i}>{n}</MenuItem>)
              )}

              <Divider />
              <MenuItem onClick={closeNotifications}>View all</MenuItem>
            </Menu>

            {/* Account dropdown */}
            <Tooltip title="Account" placement="bottom">
              <button
                type="button"
                aria-label="Open account menu"
                onClick={openAccountMenu}
                className="opacity-70 hover:opacity-100"
              >
                <img
                  src={userIcon}
                  alt="profile"
                  className="h-7 w-7 cursor-pointer"
                  draggable={false}
                />
              </button>
            </Tooltip>

            <Menu
              anchorEl={accountAnchorEl}
              open={isAccountOpen}
              onClose={closeAccountMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sign out
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Linha 2: menu */}
        <div className="flex h-10 items-center">
          <nav className="flex gap-6 text-base text-black/70">
            <Link className="cursor-pointer hover:text-black" to="/access">
              Access
            </Link>
            <Link className="cursor-pointer hover:text-black" to="/expenses">
              Expenses
            </Link>
          </nav>
        </div>
      </div>

      <div className="h-px bg-black/15" />
    </header>
  );
}