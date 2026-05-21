import { Reward, UserPoints, ApiResponse } from '../interfaces/rewards.interface';
import { rewardsMock, userPointsMock } from '../utils/mock/rewards.mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const rewardsService = {
  getRewards: async (): Promise<ApiResponse<Reward[]>> => {
    await delay(600);
    return {
      data: rewardsMock,
      status: 200,
      message: 'Success',
    };
  },
  getUserPoints: async (): Promise<ApiResponse<UserPoints>> => {
    await delay(400);
    return {
      data: userPointsMock,
      status: 200,
      message: 'Success',
    };
  },
  unlockReward: async (_rewardId: string): Promise<ApiResponse<{ success: boolean }>> => {
    await delay(800);
    return {
      data: { success: true },
      status: 200,
      message: 'Reward unlocked successfully',
    };
  },
};
