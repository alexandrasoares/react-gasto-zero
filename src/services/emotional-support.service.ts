import { SelfControlTip, ProgressData, Commitment } from '../interfaces/emotional-support.interface';
import { ApiResponse } from '../interfaces/common.interface';
import { delay, mockResponse } from '../utils/api.util';
import { selfControlTipsMock, progressDataMock } from '../utils/mock/emotional-support.mock';

export const emotionalSupportService = {
  getSelfControlTips: async (): Promise<ApiResponse<SelfControlTip[]>> => {
    await delay(600);
    return mockResponse(selfControlTipsMock);
  },
  getProgressData: async (): Promise<ApiResponse<ProgressData>> => {
    await delay(500);
    return mockResponse(progressDataMock);
  },
  saveCommitment: async (text: string): Promise<ApiResponse<Commitment>> => {
    await delay(900);
    return mockResponse(
      { text, savedAt: new Date().toISOString() },
      { status: 201, message: 'Commitment saved successfully' }
    );
  },
};
