import { World, Reward } from '../types';

export const WORLDS: World[] = [
  {
    id: 'forest',
    name: 'Las',
    description: 'Witaj w lesie pełnym sylab!',
    image: '/images/worlds/forest.svg',
    syllableIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Placeholder syllable IDs
    requiredSessionsToComplete: 3,
    rewardId: 'forest-badge',
    nextWorldId: 'space',
  },
  {
    id: 'space',
    name: 'Kosmos',
    description: 'Wyrusz w kosmiczną podróż!',
    image: '/images/worlds/space.svg',
    syllableIds: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], // Placeholder syllable IDs
    requiredSessionsToComplete: 3,
    rewardId: 'space-rocket',
    nextWorldId: 'castle',
  },
  {
    id: 'castle',
    name: 'Zamek',
    description: 'Odkryj tajemnice zamku!',
    image: '/images/worlds/castle.svg',
    syllableIds: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], // Placeholder syllable IDs
    requiredSessionsToComplete: 3,
    rewardId: 'castle-crown',
  },
];

export const REWARDS: Reward[] = [
  { id: 'forest-badge', name: 'Leśna Odznaka', image: '/images/rewards/forest-badge.svg' },
  { id: 'space-rocket', name: 'Kosmiczna Rakieta', image: '/images/rewards/space-rocket.svg' },
  { id: 'castle-crown', name: 'Zamkowa Korona', image: '/images/rewards/castle-crown.svg' },
  { id: 'star-sticker', name: 'Naklejka Gwiazdka', image: '/images/rewards/star-sticker.svg' },
];