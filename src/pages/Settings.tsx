import useGameStore from '../store/useGameStore';
import { useNavigate } from 'react-router-dom';
import { useThemeStore, Theme } from '../store/useThemeStore';
import styles from './Settings.module.css';

const themeLabels: Record<Theme, string> = {
  forest: 'Leśna',
  space: 'Kosmiczna',
  castle: 'Zamkowa',
};

const Settings = () => {
  const navigate = useNavigate();
  const { settings, setSettings } = useGameStore();
  const { theme, setTheme } = useThemeStore();

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

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ustawienia</h1>

      <div className={styles.formContainer}>
        <div className={styles.field}>
          <label htmlFor="theme" className={styles.label}>
            Szata graficzna:
          </label>
          <select id="theme" value={theme} onChange={handleThemeChange} className={styles.select}>
            {Object.entries(themeLabels).map(([themeKey, themeLabel]) => (
              <option key={themeKey} value={themeKey}>
                {themeLabel}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="syllablesPerSession" className={styles.label}>
            Liczba sylab na sesję (2-20):
          </label>
          <input
            type="number"
            id="syllablesPerSession"
            min="2"
            max="20"
            value={settings.syllablesPerSession}
            onChange={handleSyllablesPerSessionChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="learningModeDelay" className={styles.label}>
            Opóźnienie w trybie nauki (1-9s):
          </label>
          <input
            type="number"
            id="learningModeDelay"
            min="1"
            max="9"
            value={settings.learningModeDelay}
            onChange={handleLearningModeDelayChange}
            className={styles.input}
          />
        </div>

        <p className={styles.info}>
          Poziomy trudności i progresja będą dodane w przyszłości.
        </p>

        <button onClick={() => navigate('/')} className={styles.saveButton}>
          Zapisz i wróć
        </button>
      </div>
    </div>
  );
};

export default Settings;

