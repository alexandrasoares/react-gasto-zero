export interface DashboardStats {
  totalSavings: number;
  goalsAchieved: number;
  currentStreak: number;
  activeGoals: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
