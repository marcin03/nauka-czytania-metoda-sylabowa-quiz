import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useGameStore from './useGameStore';
import { ALL_SYLLABLES } from '../data/syllables';

describe('useGameStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useGameStore.setState({
        settings: {
          syllablesPerSession: 5,
          learningModeDelay: 3,
          selectedConsonants: [], // Changed from selectedVowels
        },
        currentSyllables: [],
        currentSyllableIndex: 0,
        gameMode: null,
        score: 0,
      });
    });
  });

  it('should initialize with default settings', () => {
    const { result } = renderHook(() => useGameStore());
    expect(result.current.settings).toEqual({
      syllablesPerSession: 5,
      learningModeDelay: 3,
      selectedConsonants: [], // Changed from selectedVowels
    });
    expect(result.current.gameMode).toBeNull();
    expect(result.current.score).toBe(0);
  });

  it('should update settings', () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.setSettings({ syllablesPerSession: 10, learningModeDelay: 5 });
    });
    expect(result.current.settings.syllablesPerSession).toBe(10);
    expect(result.current.settings.learningModeDelay).toBe(5);
  });

  it('should start a learning game', () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.setSettings({ selectedConsonants: ['B'] }); // Changed from selectedVowels
      result.current.startGame('learning');
    });

    expect(result.current.gameMode).toBe('learning');
    expect(result.current.currentSyllables.length).toBe(5); // Default syllables per session
    expect(result.current.currentSyllables.every(s => s.consonant === 'B')).toBe(true); // Changed from s.vowel === 'A'
    expect(result.current.currentSyllableIndex).toBe(0);
    expect(result.current.score).toBe(0);
  });

  it('should advance to the next syllable', () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.setSettings({ selectedConsonants: ['B'] }); // Added this line to avoid errors
      result.current.startGame('learning');
    });
    expect(result.current.currentSyllableIndex).toBe(0);

    act(() => {
      result.current.nextSyllable();
    });
    expect(result.current.currentSyllableIndex).toBe(1);
  });

  it('should end the game when all syllables are played', () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.setSettings({ syllablesPerSession: 1, selectedConsonants: ['B'] }); // Added selectedConsonants
      result.current.startGame('learning');
    });
    expect(result.current.gameMode).toBe('learning');

    act(() => {
      result.current.nextSyllable(); // Play the last syllable
    });
    expect(result.current.gameMode).toBeNull(); // Game should end
  });

  it('should increase score', () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.setSettings({ selectedConsonants: ['B'] }); // Added selectedConsonants
      result.current.startGame('quiz');
    });
    expect(result.current.score).toBe(0);

    act(() => {
      result.current.increaseScore();
    });
    expect(result.current.score).toBe(1);
  });

  it('should reset the game', () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.setSettings({ syllablesPerSession: 10, selectedConsonants: ['B'] }); // Added selectedConsonants
      result.current.startGame('quiz');
      result.current.increaseScore();
      result.current.nextSyllable();
    });

    expect(result.current.gameMode).toBe('quiz');
    expect(result.current.score).toBe(1);
    expect(result.current.currentSyllableIndex).toBe(1);

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameMode).toBeNull();
    expect(result.current.score).toBe(0);
    expect(result.current.currentSyllableIndex).toBe(0);
    expect(result.current.currentSyllables).toEqual([]);
  });

  it('should filter syllables based on selected consonants', () => { // Changed description
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.setSettings({ selectedConsonants: ['B', 'C'] }); // Changed from selectedVowels
      result.current.startGame('learning');
    });
    
    const allSelectedAreBorC = result.current.currentSyllables.every(s => s.consonant === 'B' || s.consonant === 'C'); // Changed filtering logic
    expect(allSelectedAreBorC).toBe(true);
    expect(result.current.currentSyllables.length).toBe(5); // Still 5 syllables per session
  });
});
