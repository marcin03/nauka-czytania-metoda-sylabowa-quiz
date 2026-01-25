import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGamificationStore } from './useGamificationStore';
import { WORLDS, REWARDS } from '../data/gamificationData';

describe('useGamificationStore', () => {
  beforeEach(() => {
    // Reset the store to its initial state before each test
    act(() => {
      useGamificationStore.setState({
        currentWorldId: WORLDS[0].id,
        completedSessionsCount: {},
        unlockedRewardIds: [],
        sessionSyllableCount: 5,
        unlockedWorldIds: [WORLDS[0].id],
      });
    });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGamificationStore());

    expect(result.current.worlds).toEqual(WORLDS);
    expect(result.current.rewards).toEqual(REWARDS);
    expect(result.current.currentWorldId).toBe(WORLDS[0].id);
    expect(result.current.completedSessionsCount).toEqual({});
    expect(result.current.unlockedRewardIds).toEqual([]);
    expect(result.current.sessionSyllableCount).toBe(5);
    expect(result.current.unlockedWorldIds).toEqual([WORLDS[0].id]);
  });

  it('should set the current world', () => {
    const { result } = renderHook(() => useGamificationStore());
    const secondWorldId = WORLDS[1].id;

    act(() => {
      result.current.setCurrentWorld(secondWorldId);
    });

    expect(result.current.currentWorldId).toBe(secondWorldId);
  });

  it('should set session syllable count within bounds', () => {
    const { result } = renderHook(() => useGamificationStore());

    act(() => {
      result.current.setSessionSyllableCount(10);
    });
    expect(result.current.sessionSyllableCount).toBe(10);

    act(() => {
      result.current.setSessionSyllableCount(1); // Should be capped at 2
    });
    expect(result.current.sessionSyllableCount).toBe(2);

    act(() => {
      result.current.setSessionSyllableCount(25); // Should be capped at 20
    });
    expect(result.current.sessionSyllableCount).toBe(20);
  });

  it('should unlock a reward', () => {
    const { result } = renderHook(() => useGamificationStore());
    const rewardToUnlock = REWARDS[0].id;

    act(() => {
      result.current.unlockReward(rewardToUnlock);
    });

    expect(result.current.unlockedRewardIds).toContain(rewardToUnlock);
    // Should not add duplicate rewards
    act(() => {
      result.current.unlockReward(rewardToUnlock);
    });
    expect(result.current.unlockedRewardIds.filter(id => id === rewardToUnlock).length).toBe(1);
  });

  it('should complete a session and unlock star sticker', () => {
    const { result } = renderHook(() => useGamificationStore());
    const currentWorld = WORLDS[0];

    act(() => {
      const details = result.current.completeSession(currentWorld.id);
      expect(details.rewardId).toBe('star-sticker');
    });

    expect(result.current.completedSessionsCount[currentWorld.id]).toBe(1);
    expect(result.current.unlockedRewardIds).toContain('star-sticker');
  });

  it('should complete a world and unlock its reward and the next world', () => {
    const { result } = renderHook(() => useGamificationStore());
    const firstWorld = WORLDS[0];
    const nextWorld = WORLDS[1];
    let worldCompletionDetails = {}; // To store the details from the world-completing session

    // Complete sessions until the world is done
    for (let i = 0; i < firstWorld.requiredSessionsToComplete; i++) {
      act(() => {
        const details = result.current.completeSession(firstWorld.id);
        if (i === firstWorld.requiredSessionsToComplete - 1) {
          worldCompletionDetails = details;
        }
      });
    }

    expect(result.current.completedSessionsCount[firstWorld.id]).toBe(firstWorld.requiredSessionsToComplete);
    expect(result.current.unlockedRewardIds).toContain(firstWorld.rewardId);
    expect(result.current.unlockedWorldIds).toContain(nextWorld.id);

    // Check session completion details from the session that completed the world
    expect(worldCompletionDetails.worldCompleted).toBe(true);
    expect(worldCompletionDetails.rewardId).toBe('star-sticker'); // Star sticker is always given for a session
  });

  it('should not unlock already unlocked worlds or rewards', () => {
    const { result } = renderHook(() => useGamificationStore());
    const firstWorld = WORLDS[0];
    const nextWorld = WORLDS[1];

    act(() => {
      // Manually unlock everything
      result.current.unlockReward(firstWorld.rewardId);
      result.current.unlockReward(nextWorld.rewardId);
      result.current.unlockedWorldIds = [...result.current.unlockedWorldIds, nextWorld.id];
    });

    // Complete sessions until the world is done
    for (let i = 0; i < firstWorld.requiredSessionsToComplete; i++) {
      act(() => {
        result.current.completeSession(firstWorld.id);
      });
    }

    // Check that rewards and worlds are not added again
    expect(result.current.unlockedRewardIds.filter(id => id === firstWorld.rewardId).length).toBe(1);
    expect(result.current.unlockedWorldIds.filter(id => id === nextWorld.id).length).toBe(1);
  });
});
