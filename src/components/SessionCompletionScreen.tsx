import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionCompletionDetails } from '../types';
import { useGamificationStore } from '../store/useGamificationStore';
import GuideCharacter from './GuideCharacter'; // Assuming GuideCharacter is in the same components folder

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
    <div className="session-completion-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-blue-400 p-4">
      <h1 className="text-4xl font-bold text-white mb-6 text-shadow-lg">Gratulacje!</h1>

      <GuideCharacter message={celebrationMessage} />

      {earnedReward && (
        <div className="reward-display flex flex-col items-center mt-8">
          <img
            src={earnedReward.image}
            alt={earnedReward.name}
            className="w-40 h-40 object-contain animate-bounce"
          />
          <p className="text-2xl font-semibold text-white mt-4">{earnedReward.name}</p>
        </div>
      )}

      <button
        onClick={handleContinue}
        className="mt-12 px-8 py-4 bg-yellow-400 text-white font-bold text-2xl rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
      >
        Kontynuuj
      </button>
    </div>
  );
};

export default SessionCompletionScreen;
