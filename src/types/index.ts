export interface Syllable {
  id: number;
  text: string;

  audioUrl?: string;
  consonant: string;
}

export interface GameSettings {
  syllablesPerSession: number;
  learningModeDelay: number;
  selectedConsonants: string[];
}

export type GameMode = 'learning' | 'quiz';
