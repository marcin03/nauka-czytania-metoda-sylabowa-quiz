import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionCompletionDetails } from '../types';
import { useGamificationStore } from '../store/useGamificationStore';
import GuideCharacter from './GuideCharacter'; // Assuming GuideCharacter is in the same components folder
import styles from './SessionCompletionScreen.module.css';

interface SessionCompletionScreenProps {
  details: SessionCompletionDetails;
}

const SessionCompletionScreen: React.FC<SessionCompletionScreenProps> = ({ details }) => {
  const navigate = useNavigate();
  const { getRewardById, currentWorldId, getWorldById } = useGamificationStore();
  const [celebrationMessage, setCelebrationMessage] = useState('');

  const earnedReward = details.rewardId ? getRewardById(details.rewardId) : undefined;
  const currentWorld = getWorldById(currentWorldId);

  useEffect(() => {
    // Play a celebratory sound
    // TODO: Implement actual sound playback
    console.log('Playing celebration sound!');

    // Generate a celebration message
    if (details.worldCompleted) {
      setCelebrationMessage(`Brawo! Ukończyłeś świat ${currentWorld?.name}! Otrzymujesz nagrodę: ${earnedReward?.name}!`);
    } else if (earnedReward) {
      setCelebrationMessage(`Świetnie! Ukończyłeś sesję i zdobywasz nagrodę: ${earnedReward.name}!`);
    } else {
      setCelebrationMessage('Świetna robota! Sesja ukończona!');
    }
  }, [details, earnedReward, currentWorld]);

  const handleContinue = () => {
    if (details.worldCompleted && currentWorld?.nextWorldId) {
      // If world completed and there's a next world, navigate to World Selection
      navigate('/worlds');
    } else {
      // Otherwise, go back to the learning/quiz mode for the current world
      // or to main menu. For now, let's go back to learn mode for the current world.
      navigate('/learn'); // TODO: Make this dynamic based on the mode the session was completed in
    }
  };

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Gratulacje!</h1>

      <GuideCharacter message={celebrationMessage} />

      {earnedReward && (
        <div className={styles.rewardDisplay}>
          <img
            src={earnedReward.image}
            alt={earnedReward.name}
            className={styles.rewardImage}
          />
          <p className={styles.rewardName}>{earnedReward.name}</p>
        </div>
      )}

      <div className={styles.buttonsContainer}>
        <button
          onClick={handleContinue}
          className={`${styles.button} ${styles.continueButton}`}
        >
          Kontynuuj
        </button>
        <button
          onClick={() => navigate('/')}
          className={`${styles.button} ${styles.mainMenuButton}`}
        >
          Menu główne
        </button>
      </div>
    </div>
  );
};

export default SessionCompletionScreen;
