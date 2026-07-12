import { GamificationStats, Badge, Achievement, LeaderboardEntry } from '../interfaces/gamification.interface';
import { ApiResponse } from '../interfaces/common.interface';
import { delay, mockResponse } from '../utils/api.util';
import { gamificationStatsMock, badgesMock, achievementsMock, leaderboardMock } from '../utils/mock/gamification.mock';

export const gamificationService = {
  getStats: async (): Promise<ApiResponse<GamificationStats>> => {
    await delay(700);
    return mockResponse(gamificationStatsMock);
  },
  getBadges: async (): Promise<ApiResponse<Badge[]>> => {
    await delay(600);
    return mockResponse(badgesMock);
  },
  getAchievements: async (): Promise<ApiResponse<Achievement[]>> => {
    await delay(500);
    return mockResponse(achievementsMock);
  },
  getLeaderboard: async (): Promise<ApiResponse<LeaderboardEntry[]>> => {
    await delay(800);
    return mockResponse(leaderboardMock);
  },
};
