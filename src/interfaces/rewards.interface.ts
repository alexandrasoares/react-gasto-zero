export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  streakDays: number;
  image?: string;
  unlocked: boolean;
}

export interface UserPoints {
  total: number;
}
