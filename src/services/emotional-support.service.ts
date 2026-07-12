import { SelfControlTip, ProgressData, Commitment, ApiResponse } from '../interfaces/emotional-support.interface';
import { selfControlTipsMock, progressDataMock } from '../utils/mock/emotional-support.mock';
import { delay, resolveApiResponse } from '../utils/api';

export const emotionalSupportService = {
  getSelfControlTips: async (): Promise<ApiResponse<SelfControlTip[]>> => {
    await delay(600);
    return resolveApiResponse({
      data: selfControlTipsMock,
      status: 200,
      message: 'Success',
    });
  },
  getProgressData: async (): Promise<ApiResponse<ProgressData>> => {
    await delay(500);
    return resolveApiResponse({
      data: progressDataMock,
      status: 200,
      message: 'Success',
    });
  },
  saveCommitment: async (text: string): Promise<ApiResponse<Commitment>> => {
    await delay(900);
    return resolveApiResponse({
      data: { text, savedAt: new Date().toISOString() },
      status: 201,
      message: 'Commitment saved successfully',
    });
  },
};
