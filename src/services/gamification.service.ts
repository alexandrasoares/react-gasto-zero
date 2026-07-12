import { GamificationStats, Badge, Achievement, LeaderboardEntry, ApiResponse } from '../interfaces/gamification.interface';
import { gamificationStatsMock, badgesMock, achievementsMock, leaderboardMock } from '../utils/mock/gamification.mock';
import { delay, resolveApiResponse } from '../utils/api';

export const gamificationService = {
  getStats: async (): Promise<ApiResponse<GamificationStats>> => {
    await delay(700);
    return resolveApiResponse({
      data: gamificationStatsMock,
      status: 200,
      message: 'Success',
    });
  },
  getBadges: async (): Promise<ApiResponse<Badge[]>> => {
    await delay(600);
    return resolveApiResponse({
      data: badgesMock,
      status: 200,
      message: 'Success',
    });
  },
  getAchievements: async (): Promise<ApiResponse<Achievement[]>> => {
    await delay(500);
    return resolveApiResponse({
      data: achievementsMock,
      status: 200,
      message: 'Success',
    });
  },
  getLeaderboard: async (): Promise<ApiResponse<LeaderboardEntry[]>> => {
    await delay(800);
    return resolveApiResponse({
      data: leaderboardMock,
      status: 200,
      message: 'Success',
    });
  },
};
