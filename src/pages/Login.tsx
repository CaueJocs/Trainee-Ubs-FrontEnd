import * as React from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/i18n/I18nContext";
import { Tooltip, IconButton, TextField, Button, InputAdornment } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type GreetingKey = "morning" | "afternoon" | "evening" | "night";

function getGreetingKey(date = new Date()): GreetingKey {
  const h = date.getUTCHours();

  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "afternoon";
  if (h >= 18 && h < 22) return "evening";
  return "night";
}

export default function Login() {
  const { t } = useI18n();

  // calcula 1x quando abre a página
  const greetingKey = React.useMemo(() => getGreetingKey(), []);
  const greeting = t(`login.greeting.${greetingKey}`);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#fbf1f2] via-[#f7dfe1] to-[#f3cfd2]">
      <Header variant="login" />

      {/* padding vertical evita grudar no header em telas menores */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-start justify-center px-4 py-8 sm:items-center sm:py-12">
        
        {/* Login Card */}
        <div className="w-full max-w-[520px] rounded-md bg-white px-8 pb-10 pt-10 shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:px-10 sm:pt-12">
          
          <div className="text-center">
            <h1 className="text-6xl font-light tracking-tight">{greeting}</h1>
            <p className="mt-2 text-sm text-[var(--ubs-charcoal)]">
              {t("login.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Email Field */}
            <TextField
              type="email"
              autoComplete="email"
              required
              fullWidth
              placeholder={t("login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title={
                          <div className="space-y-1">
                            <div>{t("login.emailInfo")}</div>
                            <div className="text-[var(--ubs-silver)]">{t("login.emailExample")}</div>
                          </div>
                        }
                        placement="right"
                        arrow
                      >
                        <IconButton size="small" edge="end" aria-label="Info">
                          <InfoOutlinedIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 1, mt: 4 }}
            />

            {/* Password Field */}
            <TextField
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              placeholder={t("login.passwordPlaceholder")}
              slotProps={{
                htmlInput: {
                  minLength: 8,
                  maxLength: 64,
                  pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).*$",
                  title: t("login.passwordValidation"),
                }
              }}
              sx={{ mb: 4 }}
            />

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: '56px',
                borderRadius: '3px',
                bgcolor: 'var(--ubs-coal)',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'black',
                },
              }}
            >
              {t("login.continue")}
            </Button>

          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
