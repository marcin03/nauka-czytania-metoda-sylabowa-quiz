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
  const [shuffledSyllables, setShuffledSyllables] = useState<Syllable[]>([]);

  const currentWorld = getWorldById(currentWorldId);

  // Filter syllables for the current world and selected consonants
  const filteredSyllables = useMemo(() => {
    if (currentWorld && settings.selectedConsonants.length > 0) {
      return ALL_SYLLABLES.filter(
        (s) =>
          // currentWorld.syllableIds.includes(s.id) && // commented tu filter by settings - not by world
          settings.selectedConsonants.includes(s.consonant)
      );
    }
    return [];
  }, [currentWorld, settings.selectedConsonants]);

  useEffect(() => {
    if (filteredSyllables.length > 0) {
      setShuffledSyllables(shuffleArray([...filteredSyllables]));
    }
  }, [filteredSyllables]);

  const actualSyllablesInSession = Math.min(shuffledSyllables.length, sessionSyllableCount);
  const currentSyllable = shuffledSyllables[currentSyllableIndex];


  const generateOptions = useCallback((correctSyllable: Syllable) => {
    // Generate incorrect options from ALL_SYLLABLES, but make sure they are not the correct answer
    // and ideally have a different consonant to avoid confusion for this quiz mode.
    // TODO: For progression, introduce similar-consonant incorrect options.
    const incorrectSyllables = ALL_SYLLABLES.filter(
      (s) => s.id !== correctSyllable.id // Must not be the correct syllable
    );

    const shuffledIncorrect = incorrectSyllables.sort(() => 0.5 - Math.random());
    const selectedOptions = shuffledIncorrect.slice(0, 2); // Get 2 incorrect options

    const allOptions = [...selectedOptions, correctSyllable];
    setOptions(allOptions.sort(() => 0.5 - Math.random())); // Shuffle all options
  }, []);

  useEffect(() => {
    if (gameMode !== 'quiz' || !currentWorld) {
      navigate('/'); // Redirect if not in quiz mode or no current world/syllables
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
      if (currentSyllable.audioUrl) {
        playAudio(currentSyllable.audioUrl);
      }
    }
  }, [
    currentSyllable,
    gameMode,
    navigate,
    playAudio,
    generateOptions,
    currentWorld,
    isSessionComplete,
    sessionCompletionDetails,
    shuffledSyllables,
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
        onClick={() => currentSyllable.audioUrl && playAudio(currentSyllable.audioUrl)}
        disabled={isPlaying || !currentSyllable.audioUrl || !!feedback}
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
