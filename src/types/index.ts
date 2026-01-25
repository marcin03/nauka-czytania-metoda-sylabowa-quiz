export interface Syllable {
  id: number;
  text: string;

  audioUrl?: string;
  vowel: string;
}

export interface GameSettings {
  syllablesPerSession: number;
  learningModeDelay: number;
  selectedVowels: string[];
}

export type GameMode = 'learning' | 'quiz';
