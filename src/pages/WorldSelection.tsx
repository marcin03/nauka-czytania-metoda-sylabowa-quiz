import React from 'react';
import { useGamificationStore } from '../store/useGamificationStore';
import { WorldId } from '../types';
import { useNavigate } from 'react-router-dom';
import styles from './WorldSelection.module.css';

// TODO: Define better styling or use a UI library
const WorldSelection: React.FC = () => {
  const navigate = useNavigate();
  const { worlds, unlockedWorldIds, currentWorldId, setCurrentWorld } = useGamificationStore();

  const handleWorldSelect = (worldId: WorldId) => {
    if (unlockedWorldIds.includes(worldId)) {
      setCurrentWorld(worldId);
      // TODO: Navigate to LearningMode or MainMenu, depending on flow
      console.log(`Selected world: ${worldId}`);
      navigate('/learn'); // Example navigation, should be dynamic based on user choice
    } else {
      console.log(`World ${worldId} is locked.`);
      // Optionally show a message to the user
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wybierz Świat</h1>
      <div className={styles.worldsGrid}>
        {worlds.map((world) => {
          const isUnlocked = unlockedWorldIds.includes(world.id);
          const isActive = currentWorldId === world.id;
          return (
            <div
              key={world.id}
              className={`${styles.worldCard} ${isUnlocked ? styles.unlocked : ''} ${isActive ? styles.active : ''}`}
              onClick={() => handleWorldSelect(world.id)}
            >
              <img src={world.image} alt={world.name} className={styles.worldImage} />
              <h2 className={styles.worldName}>{world.name}</h2>
              <p className={styles.worldDescription}>{world.description}</p>
              {!isUnlocked && (
                <div className={styles.lockedText}>Zablokowany</div>
              )}
              {isActive && isUnlocked && (
                <div className={styles.activeText}>AKTYWNY</div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => navigate('/rewards')}
        className={styles.rewardsButton}
      >
        Zobacz Moje Nagrody
      </button>
    </div>
  );
};

export default WorldSelection;
