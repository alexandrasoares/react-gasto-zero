import { GoalFormData, ApiResponse } from '../interfaces/create-goal.interface';
import { delay, resolveApiResponse } from '../utils/api';

export const createGoalService = {
  createGoal: async (_goalData: GoalFormData): Promise<ApiResponse<{ id: string }>> => {
    await delay(1000);
    return resolveApiResponse({
      data: { id: Math.random().toString(36).substr(2, 9) },
      status: 201,
      message: 'Goal created successfully',
    });
  },
};
