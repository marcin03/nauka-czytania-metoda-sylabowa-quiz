import { useEffect, useState, useCallback, useMemo } from 'react';
import useGameStore from '../store/useGameStore'; // Still needed for gameMode, increaseScore
import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import type { Syllable, SessionCompletionDetails } from '../types';
import { ALL_SYLLABLES } from '../data/syllables'; // Import all syllables
import { useGamificationStore } from '../store/useGamificationStore'; // Import gamification store
import { shuffleArray } from '../shared/utils';
import styles from './QuizMode.module.css';

const QuizMode = () => {
  const navigate = useNavigate();
  const { gameMode, increaseScore, settings } = useGameStore(); // Keep gameMode, increaseScore, and settings from useGameStore
  const { playAudio, isPlaying } = useAudioPlayer();

  const {
    currentWorldId,
    sessionSyllableCount,
    getWorldById,
    completeSession,
    completedSessionsCount,
  } = useGamificationStore();

  const [currentSyllableIndex, setCurrentSyllableIndex] = useState(0);
  const [options, setOptions] = useState<Syllable[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Syllable | null>(null);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [sessionCompletionDetails, setSessionCompletionDetails] = useState<SessionCompletionDetails | null>(null);

  const currentWorld = getWorldById(currentWorldId);

  // Filter and shuffle syllables for the current world and selected consonants
  const shuffledSyllables = useMemo(() => {
    if (currentWorld && settings.selectedConsonants.length > 0) {
      const filtered = ALL_SYLLABLES.filter((s) =>
        settings.selectedConsonants.includes(s.consonant)
      );
      return shuffleArray([...filtered]);
    }
    return [];
  }, [currentWorld, settings.selectedConsonants]);

  const actualSyllablesInSession = Math.min(shuffledSyllables.length, sessionSyllableCount);
  const currentSyllable = shuffledSyllables[currentSyllableIndex];


  const generateOptions = useCallback((correctSyllable: Syllable) => {
    // Helper to extract a vowel from syllable text
    const getVowel = (text: string): string => {
      const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
      for (const v of vowels) {
        if (text.endsWith(v)) return v;
      }
      return '';
    };

    const correctVowel = getVowel(correctSyllable.text);

    // Option 1: Same vowel, different consonant (e.g. for "BA" -> "MA", "PA")
    const sameVowelDiffConsonant = ALL_SYLLABLES.filter(
      (s) => s.id !== correctSyllable.id &&
             s.consonant !== correctSyllable.consonant &&
             (correctVowel ? getVowel(s.text) === correctVowel : false)
    );

    // Option 2: Same consonant, different vowel (e.g. for "BA" -> "BO", "BU")
    const sameConsonantDiffVowel = ALL_SYLLABLES.filter(
      (s) => s.id !== correctSyllable.id &&
             s.consonant === correctSyllable.consonant &&
             (correctVowel ? getVowel(s.text) !== correctVowel : true)
    );

    let option1: Syllable | null = null;
    let option2: Syllable | null = null;

    if (sameVowelDiffConsonant.length > 0) {
      option1 = sameVowelDiffConsonant[Math.floor(Math.random() * sameVowelDiffConsonant.length)];
    }

    if (sameConsonantDiffVowel.length > 0) {
      option2 = sameConsonantDiffVowel[Math.floor(Math.random() * sameConsonantDiffVowel.length)];
    }

    // Prepare fallback pool in case specific options could not be found
    const usedIds = new Set<number>([correctSyllable.id]);
    if (option1) usedIds.add(option1.id);
    if (option2) usedIds.add(option2.id);

    const remainingIncorrect = ALL_SYLLABLES.filter((s) => !usedIds.has(s.id));
    const shuffledRemaining = [...remainingIncorrect].sort(() => 0.5 - Math.random());

    if (!option1) {
      option1 = shuffledRemaining.pop() || null;
    }
    if (!option2) {
      option2 = shuffledRemaining.pop() || null;
    }

    const selectedOptions: Syllable[] = [];
    if (option1) selectedOptions.push(option1);
    if (option2) selectedOptions.push(option2);

    // Fallback: fill to 2 options if we don't have enough
    while (selectedOptions.length < 2 && shuffledRemaining.length > 0) {
      const extraOpt = shuffledRemaining.pop();
      if (extraOpt) selectedOptions.push(extraOpt);
    }

    const allOptions = [...selectedOptions, correctSyllable];
    setOptions(allOptions.sort(() => 0.5 - Math.random())); // Shuffle all options
  }, []);

  useEffect(() => {
    if (gameMode !== 'quiz' || !currentWorld) {
      navigate('/'); // Redirect if not in quiz mode or no current world
      return;
    }

    if (isSessionComplete) {
      navigate('/session-complete', { state: { details: sessionCompletionDetails } });
      return;
    }

    if (currentSyllable) {
      generateOptions(currentSyllable);
      setFeedback(null);
      setSelectedAnswer(null);
      playAudio(currentSyllable.audioUrl, currentSyllable.text);
    }
  }, [
    currentSyllable,
    currentSyllableIndex,
    gameMode,
    navigate,
    playAudio,
    generateOptions,
    currentWorld,
    actualSyllablesInSession,
    isSessionComplete,
    sessionCompletionDetails,
    settings.selectedConsonants // Added settings.selectedConsonants to dependencies
  ]);

  const handleAnswer = (selectedSyllable: Syllable) => {
    if (feedback) return; // Prevent multiple answers

    setSelectedAnswer(selectedSyllable);

    if (selectedSyllable.id === currentSyllable.id) {
      setFeedback('correct');
      increaseScore(); // Keep increasing score from useGameStore
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      if (currentSyllableIndex < actualSyllablesInSession - 1) {
        setCurrentSyllableIndex((prev) => prev + 1);
      } else {
        // Session completed
        const details = completeSession(currentWorldId);
        setSessionCompletionDetails(details);
        setIsSessionComplete(true);
      }
    }, 1500); // Show feedback for 1.5 seconds
  };

  if (!currentSyllable || !currentWorld) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingText}>
          Ładowanie...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.infoText}>
        Świat: {currentWorld.name} | Sesja {completedSessionsCount[currentWorldId] || 0 + 1} / {currentWorld.requiredSessionsToComplete}
      </p>
      <p className={styles.infoText}>
        Pytanie: {currentSyllableIndex + 1} / {actualSyllablesInSession}
      </p>
      <div className={styles.syllableDisplay}>
        <span className={styles.listenText}>Słuchaj...</span>
      </div>
      <button
        onClick={() => playAudio(currentSyllable.audioUrl, currentSyllable.text)}
        disabled={isPlaying || !!feedback}
        className={styles.listenButton}
      >
        Posłuchaj
      </button>

      <div className={styles.optionsContainer}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option)}
            disabled={!!feedback}
            className={`${styles.optionButton} ${
              feedback === 'correct' && selectedAnswer?.id === option.id
                ? styles.optionButtonCorrect
                : feedback === 'incorrect' && selectedAnswer?.id === option.id
                ? styles.optionButtonIncorrect
                : styles.optionButtonDefault
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
      {feedback && (
        <div
          className={`${styles.feedbackMessage} ${
            feedback === 'correct' ? styles.feedbackCorrect : styles.feedbackIncorrect
          }`}
        >
          {feedback === 'correct' ? 'Dobrze!' : 'Źle!'}
        </div>
      )}
    </div>
  );
};

export default QuizMode;
