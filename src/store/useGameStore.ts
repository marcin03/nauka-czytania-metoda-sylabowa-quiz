import { create } from 'zustand';
import type { GameSettings, Syllable, GameMode } from '../types';
import { ALL_SYLLABLES } from '../data/syllables';

interface GameState {
  settings: GameSettings;
  currentSyllables: Syllable[];
  currentSyllableIndex: number;
  gameMode: GameMode | null;
  score: number;
  setSettings: (settings: Partial<GameSettings>) => void;
  startGame: (gameMode: GameMode) => void;
  nextSyllable: () => void;
  increaseScore: () => void;
  resetGame: () => void;
}

const defaultSettings: GameSettings = {
  syllablesPerSession: 5,
  learningModeDelay: 3,
  selectedVowels: ['A', 'E', 'I', 'O', 'U', 'Y'],
};

const useGameStore = create<GameState>((set, get) => ({
  settings: defaultSettings,
  currentSyllables: [],
  currentSyllableIndex: 0,
  gameMode: null,
  score: 0,

  setSettings: (newSettings) =>
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),

  startGame: (gameMode) => {
    const { syllablesPerSession, selectedVowels } = get().settings;
    const filteredSyllables = ALL_SYLLABLES.filter((s) =>
      selectedVowels.includes(s.vowel)
    );
    
    // Simple shuffle and slice
    const sessionSyllables = filteredSyllables
      .sort(() => 0.5 - Math.random())
      .slice(0, syllablesPerSession);

    set({
      gameMode,
      currentSyllables: sessionSyllables,
      currentSyllableIndex: 0,
      score: 0,
    });
  },

  nextSyllable: () => {
    set((state) => {
      if (state.currentSyllableIndex < state.currentSyllables.length - 1) {
        return { currentSyllableIndex: state.currentSyllableIndex + 1 };
      }
      // Game session ends
      return { gameMode: null };
    });
  },

  increaseScore: () => set((state) => ({ score: state.score + 1 })),

  resetGame: () =>
    set({
      currentSyllables: [],
      currentSyllableIndex: 0,
      gameMode: null,
      score: 0,
    }),
}));

export default useGameStore;
