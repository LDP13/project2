import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeColors {
  primary: string;
}

interface ThemeStore {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
  setColors: (colors: ThemeColors) => void;
}

const defaultColors: ThemeColors = {
  primary: '#2563eb', // blue-600
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      colors: defaultColors,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setColors: (colors) => set({ colors }),
    }),
    {
      name: 'theme-storage',
    }
  )
);