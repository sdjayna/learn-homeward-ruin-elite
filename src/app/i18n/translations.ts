export type SupportedLanguages = 'en' | 'es' | 'fr';

export interface TranslationStructure {
  app: {
    title: string;
    welcome: string;
    description: string;
    copyright: string;
  };
  pwa: {
    ready: string;
    swSupported: string;
    swNotRegistered: string;
    swNotSupported: string;
    cacheComplete: string;
    installPrompt: string;
    installInstructions: string;
  };
  ui: {
    languageSelector: string;
    home: string;
    settings: string;
    about: string;
    back: string;
    next: string;
    save: string;
    cancel: string;
    close: string;
    menu: string;
    search: string;
    loading: string;
    error: string;
    retry: string;
    offline: string;
    accessibility: {
      skipToContent: string;
      languageChanged: string;
      mainNavigation: string;
      darkMode: string;
      zoomIn: string;
      zoomOut: string;
      resetZoom: string;
    };
  };
}

export const translations: Record<SupportedLanguages, TranslationStructure> = {
  en: {
    app: {
      title: "Spaced Repetition Learning Tool for 11+",
      welcome: "Welcome to Spaced Repetition Learning Tool for 11+",
      description: "A Progressive Web Application built with Angular",
      copyright: "© 2025 Spaced Repetition Learning Tool for 11+"
    },
    pwa: {
      ready: "PWA Ready: Service Worker is registered and active!",
      swSupported: "Service Worker is supported in this browser.",
      swNotRegistered: "Service Worker supported but not yet registered.",
      swNotSupported: "Service Worker is not supported in this browser. PWA functionality will be limited.",
      cacheComplete: "PWA Ready: Service Worker is active and cache is complete!",
      installPrompt: "Install this app on your device",
      installInstructions: "To install this app, tap the share icon and select 'Add to Home Screen'"
    },
    ui: {
      languageSelector: "Language",
      home: "Home",
      settings: "Settings",
      about: "About",
      back: "Back",
      next: "Next",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
      menu: "Menu",
      search: "Search",
      loading: "Loading...",
      error: "Error",
      retry: "Retry",
      offline: "You are offline",
      accessibility: {
        skipToContent: "Skip to content",
        languageChanged: "Language changed to English",
        mainNavigation: "Main navigation",
        darkMode: "Toggle dark mode",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        resetZoom: "Reset zoom"
      }
    }
  },
  es: {
    app: {
      title: "Herramienta de Aprendizaje de Repetición Espaciada para 11+",
      welcome: "Bienvenido a Herramienta de Aprendizaje de Repetición Espaciada para 11+",
      description: "Una aplicación web progresiva construida con Angular",
      copyright: "© 2025 Herramienta de Aprendizaje de Repetición Espaciada para 11+"
    },
    pwa: {
      ready: "¡PWA Lista: El Service Worker está registrado y activo!",
      swSupported: "El Service Worker es compatible con este navegador.",
      swNotRegistered: "Service Worker compatible pero aún no registrado.",
      swNotSupported: "El Service Worker no es compatible con este navegador. La funcionalidad PWA será limitada.",
      cacheComplete: "¡PWA Lista: El Service Worker está activo y el caché está completo!",
      installPrompt: "Instalar esta aplicación en su dispositivo",
      installInstructions: "Para instalar esta aplicación, toque el icono de compartir y seleccione 'Añadir a la pantalla de inicio'"
    },
    ui: {
      languageSelector: "Idioma",
      home: "Inicio",
      settings: "Configuración",
      about: "Acerca de",
      back: "Atrás",
      next: "Siguiente",
      save: "Guardar",
      cancel: "Cancelar",
      close: "Cerrar",
      menu: "Menú",
      search: "Buscar",
      loading: "Cargando...",
      error: "Error",
      retry: "Reintentar",
      offline: "Estás sin conexión",
      accessibility: {
        skipToContent: "Saltar al contenido",
        languageChanged: "Idioma cambiado a español",
        mainNavigation: "Navegación principal",
        darkMode: "Alternar modo oscuro",
        zoomIn: "Acercar",
        zoomOut: "Alejar",
        resetZoom: "Restablecer zoom"
      }
    }
  },
  fr: {
    app: {
      title: "Outil d'Apprentissage par Répétition Espacée pour 11+",
      welcome: "Bienvenue sur Outil d'Apprentissage par Répétition Espacée pour 11+",
      description: "Une application web progressive construite avec Angular",
      copyright: "© 2025 Outil d'Apprentissage par Répétition Espacée pour 11+"
    },
    pwa: {
      ready: "PWA Prête : Le Service Worker est enregistré et actif !",
      swSupported: "Le Service Worker est pris en charge dans ce navigateur.",
      swNotRegistered: "Service Worker pris en charge mais pas encore enregistré.",
      swNotSupported: "Le Service Worker n'est pas pris en charge dans ce navigateur. Les fonctionnalités PWA seront limitées.",
      cacheComplete: "PWA Prête : Le Service Worker est actif et le cache est complet !",
      installPrompt: "Installer cette application sur votre appareil",
      installInstructions: "Pour installer cette application, appuyez sur l'icône de partage et sélectionnez 'Ajouter à l'écran d'accueil'"
    },
    ui: {
      languageSelector: "Langue",
      home: "Accueil",
      settings: "Paramètres",
      about: "À propos",
      back: "Retour",
      next: "Suivant",
      save: "Enregistrer",
      cancel: "Annuler",
      close: "Fermer",
      menu: "Menu",
      search: "Rechercher",
      loading: "Chargement...",
      error: "Erreur",
      retry: "Réessayer",
      offline: "Vous êtes hors ligne",
      accessibility: {
        skipToContent: "Passer au contenu",
        languageChanged: "Langue changée en français",
        mainNavigation: "Navigation principale",
        darkMode: "Basculer en mode sombre",
        zoomIn: "Zoom avant",
        zoomOut: "Zoom arrière",
        resetZoom: "Réinitialiser le zoom"
      }
    }
  }
};
