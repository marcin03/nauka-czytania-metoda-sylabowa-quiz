import type { Syllable } from '../types';

export const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y'];

export const ALL_SYLLABLES: Syllable[] = [
  // --- Group 1: B ---
  { id: 1, text: 'BA', vowel: 'A', audioUrl: '/audio/ba.mp3' },
  { id: 2, text: 'BE', vowel: 'E', audioUrl: '/audio/be.mp3' },
  { id: 3, text: 'BI', vowel: 'I', audioUrl: '/audio/bi.mp3' },
  { id: 4, text: 'BO', vowel: 'O', audioUrl: '/audio/bo.mp3' },
  { id: 5, text: 'BU', vowel: 'U', audioUrl: '/audio/bu.mp3' },
  { id: 6, text: 'BY', vowel: 'Y', audioUrl: '/audio/by.mp3' },

  // --- Group 2: C ---
  { id: 7, text: 'CA', vowel: 'A', audioUrl: '/audio/ca.mp3' },
  { id: 8, text: 'CE', vowel: 'E', audioUrl: '/audio/ce.mp3' },
  { id: 9, text: 'CI', vowel: 'I', audioUrl: '/audio/ci.mp3' },
  { id: 10, text: 'CO', vowel: 'O', audioUrl: '/audio/co.mp3' },
  { id: 11, text: 'CU', vowel: 'U', audioUrl: '/audio/cu.mp3' },
  { id: 12, text: 'CY', vowel: 'Y', audioUrl: '/audio/cy.mp3' },

  // --- Group 3: D ---
  { id: 13, text: 'DA', vowel: 'A', audioUrl: '/audio/da.mp3' },
  { id: 14, text: 'DE', vowel: 'E', audioUrl: '/audio/de.mp3' },
  { id: 15, text: 'DI', vowel: 'I', audioUrl: '/audio/di.mp3' },
  { id: 16, text: 'DO', vowel: 'O', audioUrl: '/audio/do.mp3' },
  { id: 17, text: 'DU', vowel: 'U', audioUrl: '/audio/du.mp3' },
  { id: 18, text: 'DY', vowel: 'Y', audioUrl: '/audio/dy.mp3' },

  // --- Group 4: F ---
  { id: 19, text: 'FA', vowel: 'A', audioUrl: '/audio/fa.mp3' },
  { id: 20, text: 'FE', vowel: 'E', audioUrl: '/audio/fe.mp3' },
  { id: 21, text: 'FI', vowel: 'I', audioUrl: '/audio/fi.mp3' },
  { id: 22, text: 'FO', vowel: 'O', audioUrl: '/audio/fo.mp3' },
  { id: 23, text: 'FU', vowel: 'U', audioUrl: '/audio/fu.mp3' },
  { id: 24, text: 'FY', vowel: 'Y', audioUrl: '/audio/fy.mp3' },

  // --- Group 5: G ---
  { id: 25, text: 'GA', vowel: 'A', audioUrl: '/audio/ga.mp3' },
  { id: 26, text: 'GE', vowel: 'E', audioUrl: '/audio/ge.mp3' },
  { id: 27, text: 'GI', vowel: 'I', audioUrl: '/audio/gi.mp3' },
  { id: 28, text: 'GO', vowel: 'O', audioUrl: '/audio/go.mp3' },
  { id: 29, text: 'GU', vowel: 'U', audioUrl: '/audio/gu.mp3' },
  { id: 30, text: 'GY', vowel: 'Y', audioUrl: '/audio/gy.mp3' },
  
  // TODO: Add more syllables following the same structure.
  // To add a new syllable, add a new object to this array with:
  // - a unique id
  // - the syllable text
  // - the vowel it contains (for filtering)
  // - the path to the audio file (e.g., /audio/ma.mp3)
  // IMPORTANT: You need to provide your own audio files and place them in the `public/audio` directory.
];