import * as React from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/i18n/I18nContext";
import { Tooltip, IconButton, TextField, Button, InputAdornment, Alert } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AuthService } from "@/services/AuthService";
import type { LoginRequest } from "@/interfaces/Login";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

  // calcula 1x quando abre a página
  const greetingKey = React.useMemo(() => getGreetingKey(), []);
  const greeting = t(`login.greeting.${greetingKey}`);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);
    const loginRequest: LoginRequest = { email, password };
    if (await AuthService.login(loginRequest)) {
      navigate('/home');
    }else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#fbf1f2] via-[#f7dfe1] to-[#f3cfd2]">
      <Header variant="login" />

      <main className="mx-auto flex w-full flex-1 items-center justify-center px-4 py-8">
        
        {/* Login Card */}
        <div className="w-full max-w-[520px] rounded-md bg-white px-8 py-10 sm:px-10 sm:pt-12 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
          
          <div className="text-center">
            <h1 className="text-6xl font-light">{greeting}</h1>
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
                  //minLength: 8,
                  maxLength: 64,
                  //pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).*$",
                  title: t("login.passwordValidation"),
                }
              }}
            />

            {error && (
              <Alert icon={<ErrorOutlineIcon fontSize="medium" />} severity="error" sx={{ mt: 1 }}>
                {t("login.errorInvalidCredentials")}
              </Alert>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: '3.5rem',
                borderRadius: '3px',
                bgcolor: 'var(--ubs-coal)',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'black',
                },
                mt: 4
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
