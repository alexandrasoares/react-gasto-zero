export interface GamificationStats {
  points: number;
  level: number;
  badges: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user: string;
  points: number;
}
