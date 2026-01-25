import React from 'react';
import { useGamificationStore } from '../store/useGamificationStore';
import { WorldId } from '../types';
import { useNavigate } from 'react-router-dom'; // Assuming React Router for navigation

// TODO: Define better styling or use a UI library
const WorldSelection: React.FC = () => {
  const navigate = useNavigate();
  const { worlds, unlockedWorldIds, currentWorldId, setCurrentWorld } = useGamificationStore();

  const handleWorldSelect = (worldId: WorldId) => {
    if (unlockedWorldIds.includes(worldId)) {
      setCurrentWorld(worldId);
      // TODO: Navigate to LearningMode or MainMenu, depending on flow
      console.log(`Selected world: ${worldId}`);
      navigate('/learning'); // Example navigation
    } else {
      console.log(`World ${worldId} is locked.`);
      // Optionally show a message to the user
    }
  };

  return (
    <div className="world-selection-page p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Wybierz Świat</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {worlds.map((world) => {
          const isUnlocked = unlockedWorldIds.includes(world.id);
          const isActive = currentWorldId === world.id;
          return (
            <div
              key={world.id}
              className={`world-card bg-white rounded-lg shadow-md p-4 text-center cursor-pointer
                ${isUnlocked ? 'hover:shadow-lg transition-shadow duration-200' : 'opacity-50 cursor-not-allowed'}
                ${isActive ? 'border-4 border-blue-500' : ''}`}
              onClick={() => handleWorldSelect(world.id)}
            >
              <img src={world.image} alt={world.name} className="w-full h-32 object-contain mb-4" />
              <h2 className="text-xl font-semibold mb-2">{world.name}</h2>
              <p className="text-gray-600">{world.description}</p>
              {!isUnlocked && (
                <div className="mt-2 text-red-500 font-bold">Zablokowany</div>
              )}
              {isActive && isUnlocked && (
                <div className="mt-2 text-blue-700 font-bold">AKTYWNY</div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => navigate('/rewards')}
        className="mt-8 px-6 py-3 bg-purple-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300"
      >
        Zobacz Moje Nagrody
      </button>
    </div>
  );
};

export default WorldSelection;
