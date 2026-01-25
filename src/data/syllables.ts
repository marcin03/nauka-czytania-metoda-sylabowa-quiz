import type { Syllable } from '../types';

export const CONSONANTS = ['B', 'C', 'D', 'F', 'G']; // Example common consonants

export const ALL_SYLLABLES: Syllable[] = [
  // --- Group 1: B ---
  { id: 1, text: 'BA', consonant: 'B', audioUrl: '/audio/ba.mp3' },
  { id: 2, text: 'BE', consonant: 'B', audioUrl: '/audio/be.mp3' },
  { id: 3, text: 'BI', consonant: 'B', audioUrl: '/audio/bi.mp3' },
  { id: 4, text: 'BO', consonant: 'B', audioUrl: '/audio/bo.mp3' },
  { id: 5, text: 'BU', consonant: 'B', audioUrl: '/audio/bu.mp3' },
  { id: 6, text: 'BY', consonant: 'B', audioUrl: '/audio/by.mp3' },

  // --- Group 2: C ---
  { id: 7, text: 'CA', consonant: 'C', audioUrl: '/audio/ca.mp3' },
  { id: 8, text: 'CE', consonant: 'C', audioUrl: '/audio/ce.mp3' },
  { id: 9, text: 'CI', consonant: 'C', audioUrl: '/audio/ci.mp3' },
  { id: 10, text: 'CO', consonant: 'C', audioUrl: '/audio/co.mp3' },
  { id: 11, text: 'CU', consonant: 'C', audioUrl: '/audio/cu.mp3' },
  { id: 12, text: 'CY', consonant: 'C', audioUrl: '/audio/cy.mp3' },

  // --- Group 3: D ---
  { id: 13, text: 'DA', consonant: 'D', audioUrl: '/audio/da.mp3' },
  { id: 14, text: 'DE', consonant: 'D', audioUrl: '/audio/de.mp3' },
  { id: 15, text: 'DI', consonant: 'D', audioUrl: '/audio/di.mp3' },
  { id: 16, text: 'DO', consonant: 'D', audioUrl: '/audio/do.mp3' },
  { id: 17, text: 'DU', consonant: 'D', audioUrl: '/audio/du.mp3' },
  { id: 18, text: 'DY', consonant: 'D', audioUrl: '/audio/dy.mp3' },

  // --- Group 4: F ---
  { id: 19, text: 'FA', consonant: 'F', audioUrl: '/audio/fa.mp3' },
  { id: 20, text: 'FE', consonant: 'F', audioUrl: '/audio/fe.mp3' },
  { id: 21, text: 'FI', consonant: 'F', audioUrl: '/audio/fi.mp3' },
  { id: 22, text: 'FO', consonant: 'F', audioUrl: '/audio/fo.mp3' },
  { id: 23, text: 'FU', consonant: 'F', audioUrl: '/audio/fu.mp3' },
  { id: 24, text: 'FY', consonant: 'F', audioUrl: '/audio/fy.mp3' },

  // --- Group 5: G ---
  { id: 25, text: 'GA', consonant: 'G', audioUrl: '/audio/ga.mp3' },
  { id: 26, text: 'GE', consonant: 'G', audioUrl: '/audio/ge.mp3' },
  { id: 27, text: 'GI', consonant: 'G', audioUrl: '/audio/gi.mp3' },
  { id: 28, text: 'GO', consonant: 'G', audioUrl: '/audio/go.mp3' },
  { id: 29, text: 'GU', consonant: 'G', audioUrl: '/audio/gu.mp3' },
  { id: 30, text: 'GY', consonant: 'G', audioUrl: '/audio/gy.mp3' },
  
  // TODO: Add more syllables following the same structure.
  // To add a new syllable, add a new object to this array with:
  // - a unique id
  // - the syllable text
  // - the consonant it contains (for filtering)
  // - the path to the audio file (e.g., /audio/ma.mp3)
  // IMPORTANT: You need to provide your own audio files and place them in the `public/audio` directory.
];