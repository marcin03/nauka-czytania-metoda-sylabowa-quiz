import React from 'react';
import { useGamificationStore } from '../store/useGamificationStore';
import { useNavigate } from 'react-router-dom';
import styles from './RewardsView.module.css';

const RewardsView: React.FC = () => {
  const navigate = useNavigate();
  const { rewards, unlockedRewardIds } = useGamificationStore();

  const unlockedRewards = rewards.filter(reward => unlockedRewardIds.includes(reward.id));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Moje Nagrody</h1>

      {unlockedRewards.length === 0 ? (
        <p className={styles.noRewardsMessage}>Jeszcze nie masz żadnych nagród! Zagraj w światy, aby je zdobyć!</p>
      ) : (
        <div className={styles.rewardsGrid}>
          {unlockedRewards.map(reward => (
            <div key={reward.id} className={styles.rewardCard}>
              <img src={reward.image} alt={reward.name} className={styles.rewardImage} />
              <p className={styles.rewardName}>{reward.name}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className={styles.backButton}
      >
        Wróć do Menu
      </button>
    </div>
  );
};

export default RewardsView;
