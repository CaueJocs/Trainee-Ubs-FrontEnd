import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useI18n } from "@/i18n/I18nContext";

const LANGUAGES = [
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "it", label: "Italiano" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
] as const;

type LangValue = (typeof LANGUAGES)[number]["value"];

export function LanguageDropdown() {
  const { lang, setLang } = useI18n();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentLanguage =
    LANGUAGES.find((l) => l.value === (lang as LangValue))?.label;

  const openDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (value: LangValue) => {
    setLang(value);
    closeDropdown();
  };

  return (
    <>
      <Button
        onClick={openDropdown}
        startIcon={<LanguageIcon sx={{ fontSize: 18, opacity: 0.9 }} />}
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 18, opacity: 0.9 }} />}
        sx={{
          height: 36,
          borderRadius: '3px',
          bgcolor: 'var(--ubs-coal)',
          color: 'white',
          px: 1.5,
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 1,
          '&:hover': {
            bgcolor: 'black',
          },
        }}
      >
        {currentLanguage}
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeDropdown}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '3px',
              mt: 1.25,
              boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
              border: '1px solid rgba(0,0,0,0.1)',
            },
          },
        }}
      >
        {LANGUAGES.map((item) => {
          const selectedLanguage: boolean = item.value === lang;

          return (
            <MenuItem
              key={item.value}
              onClick={() => changeLanguage(item.value)}
              selected={selectedLanguage}
              sx={{
                px: 3,
                py: 2,
                fontSize: '18px',
                borderRadius: '2px',
                mx: 1,
                my: 0.25,
                '&.Mui-selected': {
                  bgcolor: 'var(--ubs-silver)',
                  '&:hover': {
                    bgcolor: 'var(--ubs-steel)',
                  },
                },
                '&:hover': {
                  bgcolor: 'var(--ubs-chrome)',
                },
              }}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
