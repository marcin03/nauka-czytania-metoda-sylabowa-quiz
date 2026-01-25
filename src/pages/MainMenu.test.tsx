import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainMenu from './MainMenu';
import useGameStore from '../store/useGameStore';
import { act } from 'react';

describe('MainMenu', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useGameStore.setState({
        settings: {
          syllablesPerSession: 5,
          learningModeDelay: 3,
          selectedVowels: ['A', 'E', 'I', 'O', 'U', 'Y'],
        },
        currentSyllables: [],
        currentSyllableIndex: 0,
        gameMode: null,
        score: 0,
      });
    });
  });

  it('renders correctly', () => {
    render(
      <Router>
        <MainMenu />
      </Router>
    );
    expect(screen.getByText('Nauka Czytania')).toBeInTheDocument();
    expect(screen.getByText('Wybierz samogłoski:')).toBeInTheDocument();
    expect(screen.getByText('Nauka')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
  });

  it('toggles vowel selection', () => {
    render(
      <Router>
        <MainMenu />
      </Router>
    );

    const aVowelButton = screen.getByText('A');
    expect(aVowelButton).toHaveClass('bg-green-400'); // 'A' is selected by default

    fireEvent.click(aVowelButton);
    expect(aVowelButton).not.toHaveClass('bg-green-400'); // 'A' should be deselected

    fireEvent.click(aVowelButton);
    expect(aVowelButton).toHaveClass('bg-green-400'); // 'A' should be re-selected
  });

  it('disables game mode buttons if no vowels are selected', () => {
    render(
      <Router>
        <MainMenu />
      </Router>
    );

    act(() => {
      // Deselect all vowels
      useGameStore.getState().setSettings({ selectedVowels: [] });
    });
    
    expect(screen.getByText('Nauka')).toBeDisabled();
    expect(screen.getByText('Quiz')).toBeDisabled();
  });

  it('enables game mode buttons if vowels are selected', () => {
    render(
      <Router>
        <MainMenu />
      </Router>
    );
    
    act(() => {
      // Ensure at least one vowel is selected
      useGameStore.getState().setSettings({ selectedVowels: ['A'] });
    });
    
    expect(screen.getByText('Nauka')).not.toBeDisabled();
    expect(screen.getByText('Quiz')).not.toBeDisabled();
  });
});
