import { useEffect, useCallback, useState } from 'react';
import useGameStore from '../store/useGameStore'; // Still needed for gameMode, settings
import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useGamificationStore } from '../store/useGamificationStore'; // Import gamification store
import { ALL_SYLLABLES } from '../data/syllables'; // Import all syllables
import SessionCompletionScreen from '../components/SessionCompletionScreen'; // Import SessionCompletionScreen
import { Syllable, SessionCompletionDetails } from '../types';

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

  // Filter syllables for the current world
  const currentSyllables: Syllable[] = currentWorld
    ? ALL_SYLLABLES.filter((s) => currentWorld.syllableIds.includes(s.id))
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
      <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#4a5568' }}>
        Ładowanie...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 4rem)', padding: '1rem' }}>
      <p style={{ fontSize: '1.25rem', color: '#4a5568', marginBottom: '1rem' }}>
        Świat: {currentWorld.name} | Sesja {completedSessionsCount[currentWorldId] || 0 + 1} / {currentWorld.requiredSessionsToComplete}
      </p>
      <p style={{ fontSize: '1.25rem', color: '#4a5568', marginBottom: '1rem' }}>
        Sylab: {currentSyllableIndex + 1} / {actualSyllablesInSession}
      </p>
      <div style={{ width: '16rem', height: '16rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        {showSyllable ? (
          <span style={{ fontSize: '5.625rem', fontWeight: 'bold', color: '#9333ea' /* Equivalent to purple-600 */, animation: 'fade-in 0.5s ease-out' }}>
            {syllableToShow.text}
          </span>
        ) : (
          <span style={{ fontSize: '3.125rem', color: '#a0aec0' /* Equivalent to gray-400 */ }}>Słuchaj...</span>
        )}
      </div>
      <button
        onClick={() => syllableToShow.audioUrl && playAudio(syllableToShow.audioUrl)}
        disabled={isPlaying || !syllableToShow.audioUrl}
        style={{
          padding: '1rem 2rem',
          borderRadius: '9999px',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          transition: 'background-color 0.2s',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isPlaying || !syllableToShow.audioUrl ? '#a0aec0' /* Equivalent to gray-400 */ : '#10b981' /* Equivalent to green-500 */,
        }}
      >
        Posłuchaj ponownie
      </button>
      <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#718096' }}>
        Naciśnij spację, aby przejść dalej.
      </p>
    </div>
  );
};

export default LearningMode;
