export type Lang = "de" | "fr" | "it" | "en" | "es" | "pt";

export const LANGUAGES: { value: Lang; label: string }[] = [
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "it", label: "Italiano" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
];

export const translations = {
  en: {
    login: {
      greeting: {
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
        night: "Good night",
      },
      subtitle: "Login UBS ExpenseManager",

      emailPlaceholder: "Corporate email",
      passwordPlaceholder: "Password",

      continue: "Continue",

      emailInfo:
        "Sign in with your corporate email and password. Employees can submit expenses, while Managers and Finance users can review and approve pending requests.",
      emailExample: "Ex: name.surname@ubsbb.com",
    },
    footer: {
      copyright: "© UBS 1998 – 2025. All rights reserved.",
    },
  },

  pt: {
    login: {
      greeting: {
        morning: "Bom dia",
        afternoon: "Boa tarde",
        evening: "Boa noite",
        night: "Boa noite",
      },
      subtitle: "Login UBS ExpenseManager",

      emailPlaceholder: "E-mail corporativo",
      passwordPlaceholder: "Senha",

      continue: "Continuar",

      emailInfo:
        "Entre com seu e-mail corporativo e senha. Funcionários registram despesas, enquanto Gestores e o Financeiro revisam e aprovam solicitações pendentes.",
      emailExample: "Ex: nome.sobrenome@ubsbb.com",
    },
    footer: {
      copyright: "© UBS 1998 – 2025. Todos os direitos reservados.",
    },
  },

  de: {
    login: {
      greeting: {
        morning: "Guten Morgen",
        afternoon: "Guten Tag",
        evening: "Guten Abend",
        night: "Gute Nacht",
      },
      subtitle: "Login UBS ExpenseManager",

      emailPlaceholder: "Firmen-E-Mail",
      passwordPlaceholder: "Passwort",

      continue: "Weiter",

      emailInfo:
        "Melden Sie sich mit Ihrer Firmen-E-Mail und Ihrem Passwort an. Mitarbeitende erfassen Spesen; Vorgesetzte und Finance prüfen und genehmigen offene Anfragen.",
      emailExample: "Bsp.: name.nachname@ubsbb.com",
    },
    footer: {
      copyright: "© UBS 1998 – 2025. Alle Rechte vorbehalten.",
    },
  },

  fr: {
    login: {
      greeting: {
        morning: "Bonjour",
        afternoon: "Bon après-midi",
        evening: "Bonsoir",
        night: "Bonne nuit",
      },
      subtitle: "Connexion UBS ExpenseManager",

      emailPlaceholder: "E-mail professionnel",
      passwordPlaceholder: "Mot de passe",

      continue: "Continuer",

      emailInfo:
        "Connectez-vous avec votre e-mail professionnel et votre mot de passe. Les employés saisissent leurs dépenses; les managers et la Finance examinent et approuvent les demandes en attente.",
      emailExample: "Ex. : prenom.nom@ubsbb.com",
    },
    footer: {
      copyright: "© UBS 1998 – 2025. Tous droits réservés.",
    },
  },

  it: {
    login: {
      greeting: {
        morning: "Buongiorno",
        afternoon: "Buon pomeriggio",
        evening: "Buonasera",
        night: "Buonanotte",
      },
      subtitle: "Accesso UBS ExpenseManager",

      emailPlaceholder: "E-mail aziendale",
      passwordPlaceholder: "Password",

      continue: "Continua",

      emailInfo:
        "Accedi con la tua e-mail aziendale e password. I dipendenti registrano le spese; Manager e Finance verificano e approvano le richieste in sospeso.",
      emailExample: "Es.: nome.cognome@ubsbb.com",
    },
    footer: {
      copyright: "© UBS 1998 – 2025. Tutti i diritti riservati.",
    },
  },

  es: {
    login: {
      greeting: {
        morning: "Buenos días",
        afternoon: "Buenas tardes",
        evening: "Buenas noches",
        night: "Buenas noches",
      },
      subtitle: "Inicio de sesión UBS ExpenseManager",

      emailPlaceholder: "Correo corporativo",
      passwordPlaceholder: "Contraseña",

      continue: "Continuar",

      emailInfo:
        "Inicia sesión con tu correo corporativo y contraseña. Los empleados registran gastos; Managers y Finanzas revisan y aprueban solicitudes pendientes.",
      emailExample: "Ej.: nombre.apellido@ubsbb.com",
    },
    footer: {
      copyright: "© UBS 1998 – 2025. Todos los derechos reservados.",
    },
  },
} as const;
