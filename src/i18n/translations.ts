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
    header: { country: "Switzerland" },
    login: {
      greeting: {
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
        night: "Good night",
      },
      subtitle: "Login UBS Connect",

      emailPlaceholder: "Corporate email",
      passwordPlaceholder: "Password",

      rememberMe: "Remember me",
      continue: "Continue",
      howToLogin: "How to log in",

      emailInfo:
        "Sign in with your corporate email and password. Employees can submit expenses, while Managers and Finance users can review and approve pending requests.",
    },
    footer: {
      links: {
        info: "Information on UBS",
        terms: "Terms of use",
        privacy: "Privacy statement",
        report: "Report fraudulent mail",
      },
      disclaimer:
        "The products, services, information and/or materials contained within these web pages may not be available for residents of certain jurisdictions. Please consult the sales restrictions relating to the products or services in question for further information.",
      copyright: "© UBS 1998 – 2025. All rights reserved.",
    },
  },

  pt: {
    header: { country: "Suíça" },
    login: {
      greeting: {
        morning: "Bom dia",
        afternoon: "Boa tarde",
        evening: "Boa noite",
        night: "Boa noite",
      },
      subtitle: "Login UBS Connect",

      emailPlaceholder: "E-mail corporativo",
      passwordPlaceholder: "Senha",

      rememberMe: "Lembrar-me",
      continue: "Continuar",
      howToLogin: "Como entrar",

      emailInfo:
        "Entre com seu e-mail corporativo e senha. Funcionários registram despesas, enquanto Gestores e o Financeiro revisam e aprovam solicitações pendentes.",
    },
    footer: {
      links: {
        info: "Informações sobre a UBS",
        terms: "Termos de uso",
        privacy: "Política de privacidade",
        report: "Reportar e-mail fraudulento",
      },
      disclaimer:
        "Os produtos, serviços, informações e/ou materiais contidos nestas páginas podem não estar disponíveis para residentes de determinadas jurisdições. Consulte as restrições de venda relacionadas aos produtos ou serviços em questão para mais informações.",
      copyright: "© UBS 1998 – 2025. Todos os direitos reservados.",
    },
  },

  de: {
    header: { country: "Schweiz" },
    login: {
      greeting: {
        morning: "Guten Morgen",
        afternoon: "Guten Tag",
        evening: "Guten Abend",
        night: "Gute Nacht",
      },
      subtitle: "Login UBS Connect",

      emailPlaceholder: "Firmen-E-Mail",
      passwordPlaceholder: "Passwort",

      rememberMe: "Angemeldet bleiben",
      continue: "Weiter",
      howToLogin: "So melden Sie sich an",

      emailInfo:
        "Melden Sie sich mit Ihrer Firmen-E-Mail und Ihrem Passwort an. Mitarbeitende erfassen Spesen; Vorgesetzte und Finance prüfen und genehmigen offene Anfragen.",
    },
    footer: {
      links: {
        info: "Informationen über UBS",
        terms: "Nutzungsbedingungen",
        privacy: "Datenschutzerklärung",
        report: "Betrugsverdacht melden",
      },
      disclaimer:
        "Die Produkte, Dienstleistungen, Informationen und/oder Materialien auf diesen Webseiten sind möglicherweise nicht für Bewohner bestimmter Rechtsgebiete verfügbar. Bitte konsultieren Sie die Verkaufsbeschränkungen für die betreffenden Produkte oder Dienstleistungen.",
      copyright: "© UBS 1998 – 2025. Alle Rechte vorbehalten.",
    },
  },

  fr: {
    header: { country: "Suisse" },
    login: {
      greeting: {
        morning: "Bonjour",
        afternoon: "Bon après-midi",
        evening: "Bonsoir",
        night: "Bonne nuit",
      },
      subtitle: "Connexion UBS Connect",

      emailPlaceholder: "E-mail professionnel",
      passwordPlaceholder: "Mot de passe",

      rememberMe: "Se souvenir de moi",
      continue: "Continuer",
      howToLogin: "Comment se connecter",

      emailInfo:
        "Connectez-vous avec votre e-mail professionnel et votre mot de passe. Les employés saisissent leurs dépenses; les managers et la Finance examinent et approuvent les demandes en attente.",
    },
    footer: {
      links: {
        info: "Informations sur UBS",
        terms: "Conditions d’utilisation",
        privacy: "Déclaration de confidentialité",
        report: "Signaler un e-mail frauduleux",
      },
      disclaimer:
        "Les produits, services, informations et/ou documents contenus sur ces pages peuvent ne pas être disponibles pour les résidents de certaines juridictions. Veuillez consulter les restrictions de vente relatives aux produits ou services concernés.",
      copyright: "© UBS 1998 – 2025. Tous droits réservés.",
    },
  },

  it: {
    header: { country: "Svizzera" },
    login: {
      greeting: {
        morning: "Buongiorno",
        afternoon: "Buon pomeriggio",
        evening: "Buonasera",
        night: "Buonanotte",
      },
      subtitle: "Accesso UBS Connect",

      emailPlaceholder: "E-mail aziendale",
      passwordPlaceholder: "Password",

      rememberMe: "Ricordami",
      continue: "Continua",
      howToLogin: "Come accedere",

      emailInfo:
        "Accedi con la tua e-mail aziendale e password. I dipendenti registrano le spese; Manager e Finance verificano e approvano le richieste in sospeso.",
    },
    footer: {
      links: {
        info: "Informazioni su UBS",
        terms: "Termini di utilizzo",
        privacy: "Informativa sulla privacy",
        report: "Segnala e-mail fraudolenta",
      },
      disclaimer:
        "I prodotti, servizi, informazioni e/o materiali contenuti in queste pagine potrebbero non essere disponibili per i residenti di alcune giurisdizioni. Consultare le restrizioni di vendita relative ai prodotti o servizi in questione.",
      copyright: "© UBS 1998 – 2025. Tutti i diritti riservati.",
    },
  },

  es: {
    header: { country: "Suiza" },
    login: {
      greeting: {
        morning: "Buenos días",
        afternoon: "Buenas tardes",
        evening: "Buenas noches",
        night: "Buenas noches",
      },
      subtitle: "Inicio de sesión UBS Connect",

      emailPlaceholder: "Correo corporativo",
      passwordPlaceholder: "Contraseña",

      rememberMe: "Recordarme",
      continue: "Continuar",
      howToLogin: "Cómo iniciar sesión",

      emailInfo:
        "Inicia sesión con tu correo corporativo y contraseña. Los empleados registran gastos; Managers y Finanzas revisan y aprueban solicitudes pendientes.",
    },
    footer: {
      links: {
        info: "Información sobre UBS",
        terms: "Términos de uso",
        privacy: "Declaración de privacidad",
        report: "Reportar correo fraudulento",
      },
      disclaimer:
        "Los productos, servicios, información y/o materiales de estas páginas pueden no estar disponibles para residentes de ciertas jurisdicciones. Consulte las restricciones de venta relacionadas con los productos o servicios en cuestión para más información.",
      copyright: "© UBS 1998 – 2025. Todos los derechos reservados.",
    },
  },
} as const;
