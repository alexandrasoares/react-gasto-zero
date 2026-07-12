import { DashboardStats, ApiResponse } from '../interfaces/dashboard.interface';
import { dashboardStatsMock } from '../utils/mock/dashboard.mock';
import { delay, resolveApiResponse } from '../utils/api';

export const dashboardService = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay(600);
    return resolveApiResponse({
      data: dashboardStatsMock,
      status: 200,
      message: 'Success',
    });
  },
};
