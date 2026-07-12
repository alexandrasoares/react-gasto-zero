import { DashboardStats } from '../interfaces/dashboard.interface';
import { ApiResponse } from '../interfaces/common.interface';
import { delay, mockResponse } from '../utils/api.util';
import { dashboardStatsMock } from '../utils/mock/dashboard.mock';

export const dashboardService = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay(600);
    return mockResponse(dashboardStatsMock);
  },
};
