import { Reward, UserPoints } from '../interfaces/rewards.interface';
import { ApiResponse } from '../interfaces/common.interface';
import { delay, mockResponse } from '../utils/api.util';
import { rewardsMock, userPointsMock } from '../utils/mock/rewards.mock';

export const rewardsService = {
  getRewards: async (): Promise<ApiResponse<Reward[]>> => {
    await delay(600);
    return mockResponse(rewardsMock);
  },
  getUserPoints: async (): Promise<ApiResponse<UserPoints>> => {
    await delay(400);
    return mockResponse(userPointsMock);
  },
  unlockReward: async (_rewardId: string): Promise<ApiResponse<{ success: boolean }>> => {
    await delay(800);
    return mockResponse(
      { success: true },
      { message: 'Reward unlocked successfully' }
    );
  },
};
