import { Link } from 'react-router-dom';
import useGameStore from '../store/useGameStore';
import { VOWELS } from '../data/syllables';

const MainMenu = () => {
  const { settings, setSettings, startGame } = useGameStore();

  const handleVowelToggle = (vowel: string) => {
    const { selectedVowels } = settings;
    const newSelectedVowels = selectedVowels.includes(vowel)
      ? selectedVowels.filter((v) => v !== vowel)
      : [...selectedVowels, vowel];
    setSettings({ selectedVowels: newSelectedVowels });
  };

  const handleStartGame = (mode: 'learning' | 'quiz') => {
    startGame(mode);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', color: '#facc15', marginBottom: '2rem' }}>
        Nauka Czytania
      </h1>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'semibold', marginBottom: '1rem', color: '#2563eb' }}>
          Wybierz samogłoski:
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {VOWELS.map((vowel) => (
            <button
              key={vowel}
              onClick={() => handleVowelToggle(vowel)}
              style={{
                padding: '1rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
                transform: settings.selectedVowels.includes(vowel) ? 'scale(1.1)' : 'scale(1)',
                backgroundColor: settings.selectedVowels.includes(vowel) ? '#4ade80' : '#ffffff',
                color: settings.selectedVowels.includes(vowel) ? '#ffffff' : '#4b5563',
                boxShadow: settings.selectedVowels.includes(vowel) ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {vowel}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <Link to="/learn">
          <button
            onClick={() => handleStartGame('learning')}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '0.5rem',
              fontSize: '1.875rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              transition: 'background-color 0.2s',
              border: 'none',
              cursor: 'pointer',
            }}
            disabled={settings.selectedVowels.length === 0}
          >
            Nauka
          </button>
        </Link>
        <Link to="/quiz">
          <button
            onClick={() => handleStartGame('quiz')}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#facc15',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '0.5rem',
              fontSize: '1.875rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              transition: 'background-color 0.2s',
              border: 'none',
              cursor: 'pointer',
            }}
            disabled={settings.selectedVowels.length === 0}
          >
            Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;
