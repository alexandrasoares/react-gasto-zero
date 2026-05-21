import { SelfControlTip, ProgressData, Commitment, ApiResponse } from '../interfaces/emotional-support.interface';
import { selfControlTipsMock, progressDataMock } from '../utils/mock/emotional-support.mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const emotionalSupportService = {
  getSelfControlTips: async (): Promise<ApiResponse<SelfControlTip[]>> => {
    await delay(600);
    return {
      data: selfControlTipsMock,
      status: 200,
      message: 'Success',
    };
  },
  getProgressData: async (): Promise<ApiResponse<ProgressData>> => {
    await delay(500);
    return {
      data: progressDataMock,
      status: 200,
      message: 'Success',
    };
  },
  saveCommitment: async (text: string): Promise<ApiResponse<Commitment>> => {
    await delay(900);
    return {
      data: { text, savedAt: new Date().toISOString() },
      status: 201,
      message: 'Commitment saved successfully',
    };
  },
};
