export type SupportedLanguages = 'en' | 'es' | 'fr';

export interface TranslationStructure {
  app: {
    title: string;
  };
}

export const translations: Record<SupportedLanguages, TranslationStructure> = {
  en: {
    app: {
      title: "Spaced Repetition Learning Tool for 11+"
    }
  },
  es: {
    app: {
      title: "Herramienta de Aprendizaje de Repetición Espaciada para 11+"
    }
  },
  fr: {
    app: {
      title: "Outil d'Apprentissage par Répétition Espacée pour 11+"
    }
  }
};
