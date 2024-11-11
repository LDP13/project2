import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

interface LanguageStore {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: i18n.language || 'en',
      setLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);