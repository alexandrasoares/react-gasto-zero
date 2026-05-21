import { GamificationStats, Badge, Achievement, LeaderboardEntry } from '../../interfaces/gamification.interface';

export const gamificationStatsMock: GamificationStats = {
  points: 1500,
  level: 3,
  badges: 12,
};

export const badgesMock: Badge[] = [
  {
    id: '1',
    name: 'Mindful Beginner',
    description: 'Completed first non-spending entry',
  },
  {
    id: '2',
    name: 'Savings Streak',
    description: 'Tracked non-spending for 7 consecutive days',
  },
  {
    id: '3',
    name: 'Impulse Control',
    description: 'Resisted an impulse purchase',
  },
];

export const achievementsMock: Achievement[] = [
  {
    id: '1',
    title: '50 Non-Spending Events',
    description: 'Successfully tracked 50 non-spending events',
    completed: true,
  },
  {
    id: '2',
    title: 'Level 5 Achieved',
    description: 'Reached Level 5',
    completed: true,
  },
  {
    id: '3',
    title: 'Community Champion',
    description: 'Participated in 3 community challenges',
    completed: true,
  },
];

export const leaderboardMock: LeaderboardEntry[] = [
  { rank: 1, user: 'John Doe', points: 2500 },
  { rank: 2, user: 'Jane Smith', points: 2300 },
  { rank: 3, user: 'Mike Johnson', points: 2100 },
  { rank: 4, user: 'Sarah Williams', points: 1950 },
  { rank: 5, user: 'You', points: 1500 },
];
