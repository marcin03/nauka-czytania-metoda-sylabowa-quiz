export interface Syllable {
  id: number;
  text: string;

  audioUrl?: string;
  consonant: string;
}

export interface GameSettings {
  syllablesPerSession: number;
  learningModeDelay: number;
  selectedConsonants: string[];
}

export type GameMode = 'learning' | 'quiz';

export type WorldId = string;
export type RewardId = string;

export interface World {
  id: WorldId;
  name: string;
  description: string;
  image: string; // Path to world image
  syllableIds: number[]; // IDs of syllables associated with this world
  requiredSessionsToComplete: number; // Number of sessions needed to complete this world
  rewardId: RewardId; // Reward unlocked upon completing this world
  nextWorldId?: WorldId; // ID of the next world to unlock
}

export interface Reward {
  id: RewardId;
  name: string;
  image: string; // Path to reward image
}

export interface SessionCompletionDetails {
  rewardId?: RewardId; // Reward earned in this session (if any)
  worldCompleted?: boolean; // True if completing this session also completed the world
}

export interface GamificationState {
  currentWorldId: WorldId;
  completedSessionsCount: Record<WorldId, number>; // Number of completed sessions per world
  unlockedRewardIds: RewardId[];
  sessionSyllableCount: number; // Configurable number of syllables per session
  unlockedWorldIds: WorldId[];
}

export interface GamificationActions {
  setCurrentWorld: (worldId: WorldId) => void;
  completeSession: (worldId: WorldId) => SessionCompletionDetails;
  unlockReward: (rewardId: RewardId) => void;
  setSessionSyllableCount: (count: number) => void;
}
