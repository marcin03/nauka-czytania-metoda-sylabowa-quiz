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
          selectedConsonants: [], // Changed from selectedVowels
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
    expect(screen.getByText('Wybierz spółgłoski:')).toBeInTheDocument(); // Changed text
    expect(screen.getByText('Nauka')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
  });

  it('toggles consonant selection', () => { // Changed description
    render(
      <Router>
        <MainMenu />
      </Router>
    );

    const bConsonantButton = screen.getByText('B'); // Using 'B' consonant
    expect(useGameStore.getState().settings.selectedConsonants).not.toContain('B'); // 'B' is not selected by default

    fireEvent.click(bConsonantButton);
    expect(useGameStore.getState().settings.selectedConsonants).toContain('B'); // 'B' should be selected

    fireEvent.click(bConsonantButton);
    expect(useGameStore.getState().settings.selectedConsonants).not.toContain('B'); // 'B' should be deselected
  });

  it('disables game mode buttons if no consonants are selected', () => { // Changed description
    render(
      <Router>
        <MainMenu />
      </Router>
    );

    act(() => {
      // Deselect all consonants (default state for selectedConsonants is now [])
      useGameStore.getState().setSettings({ selectedConsonants: [] });
    });
    
    expect(screen.getByText('Nauka')).toBeDisabled();
    expect(screen.getByText('Quiz')).toBeDisabled();
  });

  it('enables game mode buttons if consonants are selected', () => { // Changed description
    render(
      <Router>
        <MainMenu />
      </Router>
    );
    
    act(() => {
      // Ensure at least one consonant is selected
      useGameStore.getState().setSettings({ selectedConsonants: ['B'] });
    });
    
    expect(screen.getByText('Nauka')).not.toBeDisabled();
    expect(screen.getByText('Quiz')).not.toBeDisabled();
  });
});
