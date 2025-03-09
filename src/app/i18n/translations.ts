export type SupportedLanguages = 'en' | 'es' | 'fr';

export interface TranslationStructure {
  app: {
    title: string;
    welcome: string;
    description: string;
    copyright: string;
    version: string;
    tagline: string;
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
    study: string;
    progress: string;
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
  home: {
    targetExamDate: string;
    datePickerHelp: string;
    studySubjects: string;
    quickActions: string;
    startStudySession: string;
    viewProgress: string;
    topics: string;
  };
  study: {
    studySession: string;
    questionsCompleted: string;
    loadingQuestions: string;
    sessionComplete: string;
    sessionCompleteMessage: string;
    startNewSession: string;
    question: string;
    chooseAnswer: string;
    correct: string;
    incorrect: string;
    correctAnswerWas: string;
  };
  progress: {
    yourLearningProgress: string;
    daysUntilExam: string;
    overallMastery: string;
    progressByTopic: string;
    topicHint: string;
    questions: string;
    correct: string;
    incorrect: string;
    mastery: string;
    noProgressData: string;
    noProgressMessage: string;
    continueStudying: string;
    backToHome: string;
  };
  settings: {
    languageSettings: string;
    selectLanguage: string;
    appearance: string;
    darkMode: string;
    notifications: string;
    notificationsComingSoon: string;
    examDate: string;
    selectExamDate: string;
    examDateHelp: string;
  };
  subjects: {
    selectTopic: string;
    selectTopicMessage: string;
    sampleQuestions: string;
    noQuestions: string;
    startStudySession: string;
    returnToHome: string;
    subjectNotFound: string;
    subjectNotFoundMessage: string;
  };
}

export const translations: Record<SupportedLanguages, TranslationStructure> = {
  en: {
    app: {
      title: "Spaced Repetition Learning Tool for 11+",
      welcome: "Welcome to Spaced Repetition Learning Tool for 11+",
      description: "A Progressive Web Application built with Angular",
      copyright: "© 2025 Spaced Repetition Learning Tool for 11+",
      version: "v1.0.0",
      tagline: "Master key subjects with spaced repetition learning"
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
      study: "Study",
      progress: "Progress",
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
    },
    home: {
      targetExamDate: "Target Exam Date",
      datePickerHelp: "Setting your exam date helps optimize your study schedule",
      studySubjects: "Study Subjects",
      quickActions: "Quick Actions",
      startStudySession: "Start Study Session",
      viewProgress: "View Progress",
      topics: "topics"
    },
    study: {
      studySession: "Study Session",
      questionsCompleted: "Questions completed",
      loadingQuestions: "Loading questions...",
      sessionComplete: "Session Complete!",
      sessionCompleteMessage: "You've completed all the questions scheduled for now.",
      startNewSession: "Start New Session",
      question: "Question",
      chooseAnswer: "Choose your answer",
      correct: "Correct!",
      incorrect: "Incorrect",
      correctAnswerWas: "The correct answer was"
    },
    progress: {
      yourLearningProgress: "Your Learning Progress",
      daysUntilExam: "days until exam",
      overallMastery: "Overall Mastery",
      progressByTopic: "Progress by Topic",
      topicHint: "Topics are sorted with your weakest areas first",
      questions: "Questions",
      correct: "Correct",
      incorrect: "Incorrect",
      mastery: "Mastery",
      noProgressData: "No progress data available yet. Start studying to see your progress!",
      noProgressMessage: "No progress data available yet. Start studying to see your progress!",
      continueStudying: "Continue Studying",
      backToHome: "Back to Home"
    },
    settings: {
      languageSettings: "Language Settings",
      selectLanguage: "Select your preferred language:",
      appearance: "Appearance",
      darkMode: "Dark Mode",
      notifications: "Notifications",
      notificationsComingSoon: "Notification settings coming soon.",
      examDate: "Target Exam Date",
      selectExamDate: "Select your target exam date:",
      examDateHelp: "Setting your exam date helps optimize your study schedule"
    },
    subjects: {
      selectTopic: "Select a topic to begin",
      selectTopicMessage: "Choose a topic from the sidebar to see available questions and resources.",
      sampleQuestions: "Sample Questions",
      noQuestions: "No sample questions available for this topic yet.",
      startStudySession: "Start Study Session",
      returnToHome: "Return to Home",
      subjectNotFound: "Subject not found",
      subjectNotFoundMessage: "The subject you're looking for doesn't exist."
    }
  },
  es: {
    app: {
      title: "Herramienta de Aprendizaje de Repetición Espaciada para 11+",
      welcome: "Bienvenido a Herramienta de Aprendizaje de Repetición Espaciada para 11+",
      description: "Una aplicación web progresiva construida con Angular",
      copyright: "© 2025 Herramienta de Aprendizaje de Repetición Espaciada para 11+",
      version: "v1.0.0",
      tagline: "Domina materias clave con aprendizaje de repetición espaciada"
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
      study: "Estudiar",
      progress: "Progreso",
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
    },
    home: {
      targetExamDate: "Fecha del Examen",
      datePickerHelp: "Establecer la fecha de tu examen ayuda a optimizar tu horario de estudio",
      studySubjects: "Materias de Estudio",
      quickActions: "Acciones Rápidas",
      startStudySession: "Iniciar Sesión de Estudio",
      viewProgress: "Ver Progreso",
      topics: "temas"
    },
    study: {
      studySession: "Sesión de Estudio",
      questionsCompleted: "Preguntas completadas",
      loadingQuestions: "Cargando preguntas...",
      sessionComplete: "¡Sesión Completada!",
      sessionCompleteMessage: "Has completado todas las preguntas programadas por ahora.",
      startNewSession: "Iniciar Nueva Sesión",
      question: "Pregunta",
      chooseAnswer: "Elige tu respuesta",
      correct: "¡Correcto!",
      incorrect: "Incorrecto",
      correctAnswerWas: "La respuesta correcta era"
    },
    progress: {
      yourLearningProgress: "Tu Progreso de Aprendizaje",
      daysUntilExam: "días hasta el examen",
      overallMastery: "Dominio General",
      progressByTopic: "Progreso por Tema",
      topicHint: "Los temas están ordenados con tus áreas más débiles primero",
      questions: "Preguntas",
      correct: "Correctas",
      incorrect: "Incorrectas",
      mastery: "Dominio",
      noProgressData: "No hay datos de progreso disponibles aún. ¡Comienza a estudiar para ver tu progreso!",
      noProgressMessage: "No hay datos de progreso disponibles aún. ¡Comienza a estudiar para ver tu progreso!",
      continueStudying: "Continuar Estudiando",
      backToHome: "Volver al Inicio"
    },
    settings: {
      languageSettings: "Configuración de Idioma",
      selectLanguage: "Selecciona tu idioma preferido:",
      appearance: "Apariencia",
      darkMode: "Modo Oscuro",
      notifications: "Notificaciones",
      notificationsComingSoon: "Configuración de notificaciones próximamente.",
      examDate: "Fecha del Examen",
      selectExamDate: "Selecciona la fecha de tu examen:",
      examDateHelp: "Establecer la fecha de tu examen ayuda a optimizar tu horario de estudio"
    },
    subjects: {
      selectTopic: "Selecciona un tema para comenzar",
      selectTopicMessage: "Elige un tema de la barra lateral para ver preguntas y recursos disponibles.",
      sampleQuestions: "Preguntas de Ejemplo",
      noQuestions: "No hay preguntas de ejemplo disponibles para este tema aún.",
      startStudySession: "Iniciar Sesión de Estudio",
      returnToHome: "Volver al Inicio",
      subjectNotFound: "Materia no encontrada",
      subjectNotFoundMessage: "La materia que estás buscando no existe."
    }
  },
  fr: {
    app: {
      title: "Outil d'Apprentissage par Répétition Espacée pour 11+",
      welcome: "Bienvenue sur Outil d'Apprentissage par Répétition Espacée pour 11+",
      description: "Une application web progressive construite avec Angular",
      copyright: "© 2025 Outil d'Apprentissage par Répétition Espacée pour 11+",
      version: "v1.0.0",
      tagline: "Maîtrisez les matières clés avec l'apprentissage par répétition espacée"
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
      study: "Étudier",
      progress: "Progrès",
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
    },
    home: {
      targetExamDate: "Date d'Examen Cible",
      datePickerHelp: "Définir votre date d'examen aide à optimiser votre calendrier d'étude",
      studySubjects: "Matières d'Étude",
      quickActions: "Actions Rapides",
      startStudySession: "Commencer une Session d'Étude",
      viewProgress: "Voir les Progrès",
      topics: "sujets"
    },
    study: {
      studySession: "Session d'Étude",
      questionsCompleted: "Questions terminées",
      loadingQuestions: "Chargement des questions...",
      sessionComplete: "Session Terminée !",
      sessionCompleteMessage: "Vous avez terminé toutes les questions prévues pour le moment.",
      startNewSession: "Commencer une Nouvelle Session",
      question: "Question",
      chooseAnswer: "Choisissez votre réponse",
      correct: "Correct !",
      incorrect: "Incorrect",
      correctAnswerWas: "La bonne réponse était"
    },
    progress: {
      yourLearningProgress: "Votre Progression d'Apprentissage",
      daysUntilExam: "jours avant l'examen",
      overallMastery: "Maîtrise Globale",
      progressByTopic: "Progression par Sujet",
      topicHint: "Les sujets sont triés avec vos points faibles en premier",
      questions: "Questions",
      correct: "Correctes",
      incorrect: "Incorrectes",
      mastery: "Maîtrise",
      noProgressData: "Aucune donnée de progression disponible pour le moment. Commencez à étudier pour voir votre progression !",
      noProgressMessage: "Aucune donnée de progression disponible pour le moment. Commencez à étudier pour voir votre progression !",
      continueStudying: "Continuer à Étudier",
      backToHome: "Retour à l'Accueil"
    },
    settings: {
      languageSettings: "Paramètres de Langue",
      selectLanguage: "Sélectionnez votre langue préférée :",
      appearance: "Apparence",
      darkMode: "Mode Sombre",
      notifications: "Notifications",
      notificationsComingSoon: "Paramètres de notifications à venir.",
      examDate: "Date d'Examen Cible",
      selectExamDate: "Sélectionnez votre date d'examen cible :",
      examDateHelp: "Définir votre date d'examen aide à optimiser votre calendrier d'étude"
    },
    subjects: {
      selectTopic: "Sélectionnez un sujet pour commencer",
      selectTopicMessage: "Choisissez un sujet dans la barre latérale pour voir les questions et ressources disponibles.",
      sampleQuestions: "Questions d'Exemple",
      noQuestions: "Aucune question d'exemple disponible pour ce sujet pour le moment.",
      startStudySession: "Commencer une Session d'Étude",
      returnToHome: "Retour à l'Accueil",
      subjectNotFound: "Matière non trouvée",
      subjectNotFoundMessage: "La matière que vous recherchez n'existe pas."
    }
  }
};
