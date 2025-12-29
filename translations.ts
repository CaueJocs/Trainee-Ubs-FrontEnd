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
      contractPlaceholder: "Contract number",
      rememberMe: "Remember me",
      continue: "Continue",
      howToLogin: "How to log in",
      contractInfo:
        "Use your corporate contract number to access your expenses. Managers and Finance users can sign in to review and approve pending requests.",
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
      contractPlaceholder: "Número do contrato",
      rememberMe: "Lembrar-me",
      continue: "Continuar",
      howToLogin: "Como entrar",
      contractInfo:
        "Use seu número de contrato corporativo para acessar suas despesas. Gestores e usuários do Financeiro podem entrar para revisar e aprovar solicitações pendentes.",
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
      contractPlaceholder: "Vertragsnummer",
      rememberMe: "Angemeldet bleiben",
      continue: "Weiter",
      howToLogin: "So melden Sie sich an",
      contractInfo:
        "Verwenden Sie Ihre Unternehmensvertragsnummer, um auf Ihre Spesen zuzugreifen. Vorgesetzte und Finance können sich anmelden, um offene Anfragen zu prüfen und zu genehmigen.",
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
      contractPlaceholder: "Numéro de contrat",
      rememberMe: "Se souvenir de moi",
      continue: "Continuer",
      howToLogin: "Comment se connecter",
      contractInfo:
        "Utilisez votre numéro de contrat d’entreprise pour accéder à vos dépenses. Les managers et la Finance peuvent se connecter pour vérifier et approuver les demandes en attente.",
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
      contractPlaceholder: "Numero di contratto",
      rememberMe: "Ricordami",
      continue: "Continua",
      howToLogin: "Come accedere",
      contractInfo:
        "Usa il tuo numero di contratto aziendale per accedere alle spese. Manager e Finance possono accedere per verificare e approvare le richieste in sospeso.",
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
      contractPlaceholder: "Número de contrato",
      rememberMe: "Recordarme",
      continue: "Continuar",
      howToLogin: "Cómo iniciar sesión",
      contractInfo:
        "Usa tu número de contrato corporativo para acceder a tus gastos. Managers y Finanzas pueden iniciar sesión para revisar y aprobar solicitudes pendientes.",
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
