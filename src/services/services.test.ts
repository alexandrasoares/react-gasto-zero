import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { behavioralHistoryService } from './behavioral-history.service';
import { createGoalService } from './create-goal.service';
import { dashboardService } from './dashboard.service';
import { emotionalSupportService } from './emotional-support.service';
import { gamificationService } from './gamification.service';
import { rewardsService } from './rewards.service';

import { timelineEntriesMock } from '../utils/mock/behavioral-history.mock';
import { dashboardStatsMock } from '../utils/mock/dashboard.mock';
import { selfControlTipsMock, progressDataMock } from '../utils/mock/emotional-support.mock';
import {
  gamificationStatsMock,
  badgesMock,
  achievementsMock,
  leaderboardMock,
} from '../utils/mock/gamification.mock';
import { rewardsMock, userPointsMock } from '../utils/mock/rewards.mock';
import { GoalFormData } from '../interfaces/create-goal.interface';

// Every service call is gated behind a setTimeout delay, so we drive time with
// fake timers and resolve the returned promise together.
async function resolveWithTimers<T>(promise: Promise<T>): Promise<T> {
  await vi.runAllTimersAsync();
  return promise;
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('behavioralHistoryService', () => {
  it('returns the timeline entries mock with a success envelope', async () => {
    const res = await resolveWithTimers(behavioralHistoryService.getTimelineEntries());

    expect(res.status).toBe(200);
    expect(res.message).toBe('Success');
    expect(res.data).toEqual(timelineEntriesMock);
    expect(res.data).toHaveLength(timelineEntriesMock.length);
  });
});

describe('dashboardService', () => {
  it('returns the dashboard stats mock', async () => {
    const res = await resolveWithTimers(dashboardService.getStats());

    expect(res.status).toBe(200);
    expect(res.message).toBe('Success');
    expect(res.data).toEqual(dashboardStatsMock);
  });
});

describe('createGoalService', () => {
  const goal: GoalFormData = {
    name: 'Save for trip',
    description: 'Monthly saving',
    duration: 30,
    category: 'Travel',
    goalType: 'personal',
  };

  it('responds with a 201 and a generated id', async () => {
    const res = await resolveWithTimers(createGoalService.createGoal(goal));

    expect(res.status).toBe(201);
    expect(res.message).toBe('Goal created successfully');
    expect(typeof res.data.id).toBe('string');
    expect(res.data.id.length).toBeGreaterThan(0);
  });

  it('generates a different id on each call', async () => {
    const first = await resolveWithTimers(createGoalService.createGoal(goal));
    const second = await resolveWithTimers(createGoalService.createGoal(goal));

    expect(first.data.id).not.toBe(second.data.id);
  });
});

describe('emotionalSupportService', () => {
  it('returns the self-control tips mock', async () => {
    const res = await resolveWithTimers(emotionalSupportService.getSelfControlTips());

    expect(res.status).toBe(200);
    expect(res.data).toEqual(selfControlTipsMock);
  });

  it('returns the progress data mock', async () => {
    const res = await resolveWithTimers(emotionalSupportService.getProgressData());

    expect(res.status).toBe(200);
    expect(res.data).toEqual(progressDataMock);
  });

  it('echoes the commitment text and stamps a valid ISO date', async () => {
    const res = await resolveWithTimers(emotionalSupportService.saveCommitment('Stay disciplined'));

    expect(res.status).toBe(201);
    expect(res.message).toBe('Commitment saved successfully');
    expect(res.data.text).toBe('Stay disciplined');
    expect(Number.isNaN(Date.parse(res.data.savedAt))).toBe(false);
  });
});

describe('gamificationService', () => {
  it('returns stats, badges, achievements and leaderboard mocks', async () => {
    const [stats, badges, achievements, leaderboard] = await Promise.all([
      resolveWithTimers(gamificationService.getStats()),
      resolveWithTimers(gamificationService.getBadges()),
      resolveWithTimers(gamificationService.getAchievements()),
      resolveWithTimers(gamificationService.getLeaderboard()),
    ]);

    expect(stats.data).toEqual(gamificationStatsMock);
    expect(badges.data).toEqual(badgesMock);
    expect(achievements.data).toEqual(achievementsMock);
    expect(leaderboard.data).toEqual(leaderboardMock);
    [stats, badges, achievements, leaderboard].forEach((res) => {
      expect(res.status).toBe(200);
      expect(res.message).toBe('Success');
    });
  });
});

describe('rewardsService', () => {
  it('returns the rewards mock', async () => {
    const res = await resolveWithTimers(rewardsService.getRewards());

    expect(res.status).toBe(200);
    expect(res.data).toEqual(rewardsMock);
  });

  it('returns the user points mock', async () => {
    const res = await resolveWithTimers(rewardsService.getUserPoints());

    expect(res.status).toBe(200);
    expect(res.data).toEqual(userPointsMock);
  });

  it('reports success when unlocking a reward regardless of id', async () => {
    const res = await resolveWithTimers(rewardsService.unlockReward('any-id'));

    expect(res.status).toBe(200);
    expect(res.message).toBe('Reward unlocked successfully');
    expect(res.data.success).toBe(true);
  });
});
