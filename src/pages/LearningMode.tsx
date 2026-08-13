import { useEffect, useCallback, useState, useMemo } from 'react';
import useGameStore from '../store/useGameStore'; // Still needed for gameMode, settings
import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useGamificationStore } from '../store/useGamificationStore'; // Import gamification store
import { ALL_SYLLABLES } from '../data/syllables'; // Import all syllables
import { Syllable, SessionCompletionDetails } from '../types';
import { shuffleArray } from '../shared/utils';
import styles from './LearningMode.module.css';

const LearningMode = () => {
  const navigate = useNavigate();
  const { gameMode, settings } = useGameStore(); // Keep gameMode and settings from useGameStore
  const { playAudio, isPlaying } = useAudioPlayer();

  const {
    currentWorldId,
    sessionSyllableCount,
    getWorldById,
    completeSession,
    completedSessionsCount,
  } = useGamificationStore();

  const [currentSyllableIndex, setCurrentSyllableIndex] = useState(0);
  const [showSyllable, setShowSyllable] = useState(false);
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
  const syllableToShow = shuffledSyllables[currentSyllableIndex];

  const handleNext = useCallback(() => {
    if (currentSyllableIndex < actualSyllablesInSession - 1) {
      setCurrentSyllableIndex((prev) => prev + 1);
    } else {
      // Session completed
      const details = completeSession(currentWorldId);
      setSessionCompletionDetails(details);
      setIsSessionComplete(true);
      // We don't navigate immediately here, SessionCompletionScreen will handle it
    }
    setShowSyllable(false); // Hide syllable text before playing next audio
  }, [currentSyllableIndex, actualSyllablesInSession, currentWorldId, completeSession]);

  useEffect(() => {
    if (gameMode !== 'learning' || !currentWorld) {
      navigate('/'); // Redirect if not in learning mode or no current world/syllables
      return;
    }

    if (isSessionComplete) {
        // Navigate to a temporary route to render SessionCompletionScreen
        navigate('/session-complete', { state: { details: sessionCompletionDetails } });
        return;
    }

    // if syllableToShow is not ready, don't do anything
    if (!syllableToShow) {
      return;
    }

    const playAndShow = async () => {
      if (syllableToShow) {
        await playAudio(syllableToShow.audioUrl, syllableToShow.text);
        setShowSyllable(true);
      }
    };

    playAndShow();

    const timer = setTimeout(handleNext, settings.learningModeDelay * 1000);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        clearTimeout(timer);
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    currentSyllableIndex,
    gameMode,
    navigate,
    playAudio,
    handleNext,
    settings.learningModeDelay,
    currentWorld,
    isSessionComplete,
    sessionCompletionDetails,
    shuffledSyllables, // Use shuffledSyllables as a dependency
  ]);

  if (!syllableToShow || !currentWorld) {
    return (
      <div className={styles.loadingText}>
        Ładowanie...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.infoText}>
        Świat: {currentWorld.name} | Sesja {completedSessionsCount[currentWorldId] || 0 + 1} / {currentWorld.requiredSessionsToComplete}
      </p>
      <p className={styles.infoText}>
        Sylab: {currentSyllableIndex + 1} / {actualSyllablesInSession}
      </p>
      <div className={styles.syllableDisplay}>
        {showSyllable ? (
          <span className={styles.syllableText}>
            {syllableToShow.text}
          </span>
        ) : (
          <span className={styles.listenText}>Słuchaj...</span>
        )}
      </div>
      <button
        onClick={() => playAudio(syllableToShow.audioUrl, syllableToShow.text)}
        disabled={isPlaying}
        className={styles.listenButton}
      >
        Posłuchaj ponownie
      </button>
      <p className={styles.hintText}>
        Naciśnij spację, aby przejść dalej.
      </p>
    </div>
  );
};

export default LearningMode;
