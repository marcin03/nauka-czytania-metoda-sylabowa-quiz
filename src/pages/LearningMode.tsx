import { useEffect, useCallback, useState } from 'react';
import useGameStore from '../store/useGameStore'; // Still needed for gameMode, settings
import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useGamificationStore } from '../store/useGamificationStore'; // Import gamification store
import { ALL_SYLLABLES } from '../data/syllables'; // Import all syllables
import SessionCompletionScreen from '../components/SessionCompletionScreen'; // Import SessionCompletionScreen
import { Syllable, SessionCompletionDetails } from '../types';
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

  // Filter syllables for the current world and selected consonants
  const currentSyllables: Syllable[] = currentWorld && settings.selectedConsonants.length > 0
    ? ALL_SYLLABLES.filter(
        (s) =>
          currentWorld.syllableIds.includes(s.id) &&
          settings.selectedConsonants.includes(s.consonant)
      )
    : [];


  const actualSyllablesInSession = Math.min(currentSyllables.length, sessionSyllableCount);
  const syllableToShow = currentSyllables[currentSyllableIndex];

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
    if (gameMode !== 'learning' || !currentWorld || actualSyllablesInSession === 0) {
      navigate('/'); // Redirect if not in learning mode or no current world/syllables
      return;
    }

    if (isSessionComplete) {
        // Navigate to a temporary route to render SessionCompletionScreen
        navigate('/session-complete', { state: { details: sessionCompletionDetails } });
        return;
    }

    const playAndShow = async () => {
      if (syllableToShow && syllableToShow.audioUrl) {
        await playAudio(syllableToShow.audioUrl);
        setShowSyllable(true);
      } else if (syllableToShow) {
        // If no audioUrl, just show the syllable
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
    actualSyllablesInSession,
    gameMode,
    navigate,
    playAudio,
    handleNext,
    settings.learningModeDelay,
    currentWorld,
    syllableToShow,
    isSessionComplete,
    sessionCompletionDetails,
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
        onClick={() => syllableToShow.audioUrl && playAudio(syllableToShow.audioUrl)}
        disabled={isPlaying || !syllableToShow.audioUrl}
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
