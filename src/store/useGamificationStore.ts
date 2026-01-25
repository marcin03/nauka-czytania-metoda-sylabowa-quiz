import { create } from 'zustand';
import {
  GamificationState,
  GamificationActions,
  World,
  Reward,
  WorldId,
  RewardId,
  SessionCompletionDetails,
} from '../types';
import { WORLDS, REWARDS } from '../data/gamificationData'; // Import from centralized data file

interface GamificationStore extends GamificationState, GamificationActions {
  worlds: World[];
  rewards: Reward[];
  getWorldById: (worldId: WorldId) => World | undefined;
  getRewardById: (rewardId: RewardId) => Reward | undefined;
}

export const useGamificationStore = create<GamificationStore>((set, get) => ({
  worlds: WORLDS,
  rewards: REWARDS,
  currentWorldId: WORLDS[0].id,
  completedSessionsCount: {},
  unlockedRewardIds: [],
  sessionSyllableCount: 5, // Default configurable session length
  unlockedWorldIds: [WORLDS[0].id], // Start with the first world unlocked

  getWorldById: (worldId: WorldId) => {
    return get().worlds.find((world) => world.id === worldId);
  },

  getRewardById: (rewardId: RewardId) => {
    return get().rewards.find((reward) => reward.id === rewardId);
  },

  setCurrentWorld: (worldId: WorldId) => set({ currentWorldId: worldId }),

  setSessionSyllableCount: (count: number) => {
    // Ensure count is within a reasonable range (e.g., 2 to 20)
    const newCount = Math.max(2, Math.min(20, count));
    set({ sessionSyllableCount: newCount });
  },

  completeSession: (worldId: WorldId): SessionCompletionDetails => {
    const { completedSessionsCount, unlockedRewardIds, unlockedWorldIds, worlds, unlockReward } = get();
    const currentWorld = worlds.find((world) => world.id === worldId);

    if (!currentWorld) {
      console.warn(`Attempted to complete session for unknown world: ${worldId}`);
      return {};
    }

    const sessionsInWorld = (completedSessionsCount[worldId] || 0) + 1;
    let sessionDetails: SessionCompletionDetails = {};

    set((state) => ({
      completedSessionsCount: {
        ...state.completedSessionsCount,
        [worldId]: sessionsInWorld,
      },
    }));

    // Reward for completing any session (e.g., a star sticker)
    // TODO: Make this more dynamic / configurable
    if (!unlockedRewardIds.includes('star-sticker')) {
        unlockReward('star-sticker');
        sessionDetails.rewardId = 'star-sticker'; // Indicate this reward was given for the session
    } else {
        // If star-sticker is already unlocked, give it again for this session as a generic reward
        // or implement a system for repeating rewards. For now, we'll just indicate it was earned.
        sessionDetails.rewardId = 'star-sticker';
    }


    // Check if world is completed
    if (sessionsInWorld >= currentWorld.requiredSessionsToComplete) {
      sessionDetails.worldCompleted = true; // Set to true unconditionally when world is completed
      if (!unlockedRewardIds.includes(currentWorld.rewardId)) {
        unlockReward(currentWorld.rewardId);
      }

      // Unlock next world if it exists and is not already unlocked
      if (currentWorld.nextWorldId && !unlockedWorldIds.includes(currentWorld.nextWorldId)) {
        set((state) => ({
          unlockedWorldIds: [...state.unlockedWorldIds, currentWorld.nextWorldId!],
        }));
      }
    }
    return sessionDetails;
  },

  unlockReward: (rewardId: RewardId) => {
    set((state) => {
      if (!state.unlockedRewardIds.includes(rewardId)) {
        return {
          unlockedRewardIds: [...state.unlockedRewardIds, rewardId],
        };
      }
      return state;
    });
  },
}));
