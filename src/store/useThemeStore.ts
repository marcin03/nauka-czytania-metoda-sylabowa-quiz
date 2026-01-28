import { create } from 'zustand';

export type Theme = 'forest' | 'space' | 'castle';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'forest', // Default theme
  setTheme: (theme) => set({ theme }),
}));
