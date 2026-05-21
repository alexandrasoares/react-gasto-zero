export interface GoalFormData {
  name: string;
  description: string;
  duration: number;
  category: string;
  goalType: 'personal' | 'weekly';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
