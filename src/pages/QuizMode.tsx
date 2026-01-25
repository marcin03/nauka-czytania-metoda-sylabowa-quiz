import { useEffect, useState } from 'react';
import useGameStore from '../store/useGameStore';
import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import type { Syllable } from '../types';
import { ALL_SYLLABLES } from '../data/syllables';

const QuizMode = () => {
  const navigate = useNavigate();
  const { currentSyllables, currentSyllableIndex, nextSyllable, gameMode, increaseScore, resetGame } =
    useGameStore();
  const { playAudio, isPlaying } = useAudioPlayer();
  const [options, setOptions] = useState<Syllable[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Syllable | null>(null);

  const currentSyllable = currentSyllables[currentSyllableIndex];

  useEffect(() => {
    if (gameMode !== 'quiz' || currentSyllables.length === 0) {
      navigate('/');
      return;
    }

    if (currentSyllable) {
      const generateOptions = () => {
        const incorrectSyllables = ALL_SYLLABLES.filter(
          (s) => s.text !== currentSyllable.text && s.consonant !== currentSyllable.consonant
        );
        const shuffledIncorrect = incorrectSyllables.sort(() => 0.5 - Math.random());
        const selectedOptions = shuffledIncorrect.slice(0, 2); // Get 2 incorrect options
        
        const allOptions = [...selectedOptions, currentSyllable];
        setOptions(allOptions.sort(() => 0.5 - Math.random())); // Shuffle all options
      };
      generateOptions();
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentSyllable.audioUrl) {
        playAudio(currentSyllable.audioUrl);
      }
    }
  }, [currentSyllable, currentSyllables, gameMode, navigate, playAudio]);

  const handleAnswer = (selectedSyllable: Syllable) => {
    if (feedback) return; // Prevent multiple answers

    setSelectedAnswer(selectedSyllable);

    if (selectedSyllable.id === currentSyllable.id) {
      setFeedback('correct');
      increaseScore();
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      if (currentSyllableIndex < currentSyllables.length - 1) {
        nextSyllable();
      } else {
        resetGame();
        navigate('/'); // End of session, go to main menu
      }
    }, 1500); // Show feedback for 1.5 seconds
  };

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
        Pytanie: {currentSyllableIndex + 1} / {currentSyllables.length}
      </p>
      <div style={{ width: '16rem', height: '16rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <span style={{ fontSize: '3.125rem', color: '#a0aec0' /* Equivalent to gray-400 */ }}>Słuchaj...</span>
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
