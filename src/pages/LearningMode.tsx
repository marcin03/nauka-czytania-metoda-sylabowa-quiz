import { useEffect, useCallback, useState } from 'react';
import useGameStore from '../store/useGameStore';
import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

const LearningMode = () => {
  const navigate = useNavigate();
  const { currentSyllables, currentSyllableIndex, nextSyllable, gameMode, settings, resetGame } =
    useGameStore();
  const { playAudio, isPlaying } = useAudioPlayer();
  const [showSyllable, setShowSyllable] = useState(false);

  const currentSyllable = currentSyllables[currentSyllableIndex];

  const handleNext = useCallback(() => {
    if (currentSyllableIndex < currentSyllables.length - 1) {
      nextSyllable();
    } else {
      resetGame();
      navigate('/'); // Go back to main menu when session ends
    }
    setShowSyllable(false); // Hide syllable text before playing next audio
  }, [currentSyllableIndex, currentSyllables.length, nextSyllable, resetGame, navigate]);

  useEffect(() => {
    if (gameMode !== 'learning' || currentSyllables.length === 0) {
      navigate('/');
      return;
    }

    const playAndShow = async () => {
      if (currentSyllable && currentSyllable.audioUrl) {
        await playAudio(currentSyllable.audioUrl);
        setShowSyllable(true);
      } else if (currentSyllable) { // If no audioUrl, just show the syllable
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
  }, [currentSyllable, currentSyllableIndex, currentSyllables.length, gameMode, navigate, playAudio, handleNext, settings.learningModeDelay]);


  if (!currentSyllable) {
    return (
      <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#4a5568' }}>
        Ładowanie...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 4rem)', padding: '1rem' }}>
      <p style={{ fontSize: '1.25rem', color: '#4a5568', marginBottom: '1rem' }}>
        Sylab: {currentSyllableIndex + 1} / {currentSyllables.length}
      </p>
      <div style={{ width: '16rem', height: '16rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        {showSyllable ? (
          <span style={{ fontSize: '5.625rem', fontWeight: 'bold', color: '#9333ea' /* Equivalent to purple-600 */, animation: 'fade-in 0.5s ease-out' }}>
            {currentSyllable.text}
          </span>
        ) : (
          <span style={{ fontSize: '3.125rem', color: '#a0aec0' /* Equivalent to gray-400 */ }}>Słuchaj...</span>
        )}
      </div>
      <button
        onClick={() => currentSyllable.audioUrl && playAudio(currentSyllable.audioUrl)}
        disabled={isPlaying || !currentSyllable.audioUrl}
        style={{
          padding: '1rem 2rem',
          borderRadius: '9999px',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          transition: 'background-color 0.2s',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isPlaying || !currentSyllable.audioUrl ? '#a0aec0' /* Equivalent to gray-400 */ : '#10b981' /* Equivalent to green-500 */,
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
