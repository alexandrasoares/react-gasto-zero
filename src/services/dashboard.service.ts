import { DashboardStats, ApiResponse } from '../interfaces/dashboard.interface';
import { dashboardStatsMock } from '../utils/mock/dashboard.mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay(600);
    return {
      data: dashboardStatsMock,
      status: 200,
      message: 'Success',
    };
  },
};
