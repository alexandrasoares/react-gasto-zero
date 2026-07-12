import { GoalFormData } from '../interfaces/create-goal.interface';
import { ApiResponse } from '../interfaces/common.interface';
import { delay, mockResponse } from '../utils/api.util';

export const createGoalService = {
  createGoal: async (_goalData: GoalFormData): Promise<ApiResponse<{ id: string }>> => {
    await delay(1000);
    return mockResponse(
      { id: Math.random().toString(36).substr(2, 9) },
      { status: 201, message: 'Goal created successfully' }
    );
  },
};
