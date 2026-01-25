import React from 'react';
import { useGamificationStore } from '../store/useGamificationStore';
import { useNavigate } from 'react-router-dom';

const RewardsView: React.FC = () => {
  const navigate = useNavigate();
  const { rewards, unlockedRewardIds } = useGamificationStore();

  const unlockedRewards = rewards.filter(reward => unlockedRewardIds.includes(reward.id));

  return (
    <div className="rewards-view-page p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Moje Nagrody</h1>

      {unlockedRewards.length === 0 ? (
        <p className="text-xl text-gray-700">Jeszcze nie masz żadnych nagród! Zagraj w światy, aby je zdobyć!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {unlockedRewards.map(reward => (
            <div key={reward.id} className="reward-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img src={reward.image} alt={reward.name} className="w-24 h-24 object-contain mb-2" />
              <p className="text-lg font-semibold text-gray-800">{reward.name}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
      >
        Wróć do Menu
      </button>
    </div>
  );
};

export default RewardsView;
