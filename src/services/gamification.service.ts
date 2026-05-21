import { GamificationStats, Badge, Achievement, LeaderboardEntry, ApiResponse } from '../interfaces/gamification.interface';
import { gamificationStatsMock, badgesMock, achievementsMock, leaderboardMock } from '../utils/mock/gamification.mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const gamificationService = {
  getStats: async (): Promise<ApiResponse<GamificationStats>> => {
    await delay(700);
    return {
      data: gamificationStatsMock,
      status: 200,
      message: 'Success',
    };
  },
  getBadges: async (): Promise<ApiResponse<Badge[]>> => {
    await delay(600);
    return {
      data: badgesMock,
      status: 200,
      message: 'Success',
    };
  },
  getAchievements: async (): Promise<ApiResponse<Achievement[]>> => {
    await delay(500);
    return {
      data: achievementsMock,
      status: 200,
      message: 'Success',
    };
  },
  getLeaderboard: async (): Promise<ApiResponse<LeaderboardEntry[]>> => {
    await delay(800);
    return {
      data: leaderboardMock,
      status: 200,
      message: 'Success',
    };
  },
};
