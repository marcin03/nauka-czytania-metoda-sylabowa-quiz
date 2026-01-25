import { useEffect, useState, useCallback } from 'react';
import useGameStore from '../store/useGameStore'; // Still needed for gameMode, increaseScore
import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import type { Syllable, SessionCompletionDetails } from '../types';
import { ALL_SYLLABLES } from '../data/syllables'; // Import all syllables
import { useGamificationStore } from '../store/useGamificationStore'; // Import gamification store

const QuizMode = () => {
  const navigate = useNavigate();
  const { gameMode, increaseScore } = useGameStore(); // Keep gameMode and increaseScore from useGameStore
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

  // Filter syllables for the current world
  const worldSyllables: Syllable[] = currentWorld
    ? ALL_SYLLABLES.filter((s) => currentWorld.syllableIds.includes(s.id))
    : [];

  const actualSyllablesInSession = Math.min(worldSyllables.length, sessionSyllableCount);
  const currentSyllable = worldSyllables[currentSyllableIndex];


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
    if (gameMode !== 'quiz' || !currentWorld || actualSyllablesInSession === 0) {
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
    currentSyllableIndex,
    gameMode,
    navigate,
    playAudio,
    generateOptions,
    currentWorld,
    actualSyllablesInSession,
    isSessionComplete,
    sessionCompletionDetails,
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
        Pytanie: {currentSyllableIndex + 1} / {actualSyllablesInSession}
      </p>
      <div style={{ width: '16rem', height: '16rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <span style={{ fontSize: '3.125rem', color: '#a0aec0' /* Equivalent to gray-400 */ }}>Słuchaj...</span>
      </div>
      <button
        onClick={() => currentSyllable.audioUrl && playAudio(currentSyllable.audioUrl)}
        disabled={isPlaying || !currentSyllable.audioUrl || !!feedback}
        style={{
          padding: '1rem 2rem',
          borderRadius: '9999px',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          transition: 'background-color 0.2s',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isPlaying || !currentSyllable.audioUrl || !!feedback ? '#a0aec0' /* Equivalent to gray-400 */ : '#10b981' /* Equivalent to green-500 */,
        }}
      >
        Posłuchaj
      </button>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option)}
            disabled={!!feedback}
            style={{
              padding: '1.5rem 2rem',
              borderRadius: '0.5rem',
              fontSize: '2.25rem',
              fontWeight: 'bold',
              transition: 'all 0.2s',
              transform: 'scale(1)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor:
                feedback === 'correct' && selectedAnswer?.id === option.id
                  ? '#10b981' /* Green */
                  : feedback === 'incorrect' && selectedAnswer?.id === option.id
                  ? '#ef4444' /* Red */
                  : '#ffffff', /* White */
              color:
                feedback && selectedAnswer?.id === option.id
                  ? '#ffffff'
                  : '#2563eb', /* Blue */
              boxShadow:
                feedback && selectedAnswer?.id === option.id
                  ? '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)'
                  : '0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)',
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
      {feedback && (
        <div
          style={{
            marginTop: '1.5rem',
            fontSize: '3.125rem',
            fontWeight: 'bold',
            animation: 'bounce 1s infinite', // Note: CSS animation needs to be defined
            color: feedback === 'correct' ? '#16a34a' /* Green */ : '#dc2626' /* Red */,
          }}
        >
          {feedback === 'correct' ? 'Dobrze!' : 'Źle!'}
        </div>
      )}
    </div>
  );
};

export default QuizMode;
