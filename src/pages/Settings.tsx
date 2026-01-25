import useGameStore from '../store/useGameStore';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const { settings, setSettings } = useGameStore();

  const handleSyllablesPerSessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 2) value = 2;
    if (value > 20) value = 20;
    setSettings({ syllablesPerSession: value });
  };

  const handleLearningModeDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 1) value = 1;
    if (value > 9) value = 9;
    setSettings({ learningModeDelay: value });
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '2rem' }}>Ustawienia</h1>

      <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', maxWidth: '28rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="syllablesPerSession" style={{ display: 'block', fontSize: '1.25rem', fontWeight: 'semibold', color: '#4a5568', marginBottom: '0.5rem' }}>
            Liczba sylab na sesję (2-20):
          </label>
          <input
            type="number"
            id="syllablesPerSession"
            min="2"
            max="20"
            value={settings.syllablesPerSession}
            onChange={handleSyllablesPerSessionChange}
            style={{ width: '100%', padding: '0.75rem', border: '2px solid #90cdf4', borderRadius: '0.5rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#2b6cb0', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="learningModeDelay" style={{ display: 'block', fontSize: '1.25rem', fontWeight: 'semibold', color: '#4a5568', marginBottom: '0.5rem' }}>
            Opóźnienie w trybie nauki (1-9s):
          </label>
          <input
            type="number"
            id="learningModeDelay"
            min="1"
            max="9"
            value={settings.learningModeDelay}
            onChange={handleLearningModeDelayChange}
            style={{ width: '100%', padding: '0.75rem', border: '2px solid #90cdf4', borderRadius: '0.5rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#2b6cb0', outline: 'none' }}
          />
        </div>

        {/* TODO: Add difficulty levels / levels of progression here later */}
        <p style={{ color: '#a0aec0', fontSize: '0.875rem', marginTop: '1rem' }}>
          Poziomy trudności i progresja będą dodane w przyszłości.
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            backgroundColor: '#10b981',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '0.5rem',
            fontSize: '1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: 'background-color 0.2s',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Zapisz i wróć
        </button>
      </div>
    </div>
  );
};

export default Settings;
