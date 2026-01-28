import { Link } from 'react-router-dom';
import useGameStore from '../store/useGameStore';
import { CONSONANTS } from '../data/syllables';
import styles from './MainMenu.module.css';

const MainMenu = () => {
  const { settings, setSettings, startGame } = useGameStore();

  const handleConsonantToggle = (consonant: string) => {
    const { selectedConsonants } = settings;
    const newSelectedConsonants = selectedConsonants.includes(consonant)
      ? selectedConsonants.filter((c) => c !== consonant)
      : [...selectedConsonants, consonant];
    setSettings({ selectedConsonants: newSelectedConsonants });
  };

  const handleStartGame = (mode: 'learning' | 'quiz') => {
    startGame(mode);
  };

  const isConsonantSelected = (consonant: string) => settings.selectedConsonants.includes(consonant);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Nauka Czytania
      </h1>
      <div className={styles.worldsButton}>
        <Link to="/worlds">
          <button className={`${styles.gameButton} ${styles.worldsNavButton}`}>
            Wybierz Świat
          </button>
        </Link>
      </div>

      <div className={styles.consonantsContainer}>
        <h2 className={styles.consonantsTitle}>
          Wybierz spółgłoski:
        </h2>
        <div className={styles.consonantsGrid}>
          {CONSONANTS.map((consonant) => (
            <button
              key={consonant}
              onClick={() => handleConsonantToggle(consonant)}
              className={`${styles.consonantButton} ${isConsonantSelected(consonant) ? styles.consonantButtonSelected : styles.consonantButtonUnselected}`}
            >
              {consonant}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.gameButtonsContainer}>
        <Link to="/learn">
          <button
            onClick={() => handleStartGame('learning')}
            className={`${styles.gameButton} ${styles.learnButton}`}
            disabled={settings.selectedConsonants.length === 0}
          >
            Nauka
          </button>
        </Link>
        <Link to="/quiz">
          <button
            onClick={() => handleStartGame('quiz')}
            className={`${styles.gameButton} ${styles.quizButton}`}
            disabled={settings.selectedConsonants.length === 0}
          >
            Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;

