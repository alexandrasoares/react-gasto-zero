import { Reward, UserPoints } from '../../interfaces/rewards.interface';

export const rewardsMock: Reward[] = [
  {
    id: '1',
    title: '7-Day Streak',
    description: 'Free Afternoon for Leisure',
    pointsRequired: 50,
    streakDays: 7,
    unlocked: false,
  },
  {
    id: '2',
    title: '14-Day Streak',
    description: 'Dinner at Your Favorite Restaurant',
    pointsRequired: 100,
    streakDays: 14,
    unlocked: false,
  },
  {
    id: '3',
    title: '30-Day Streak',
    description: 'Weekend Getaway',
    pointsRequired: 200,
    streakDays: 30,
    unlocked: false,
  },
];

export const userPointsMock: UserPoints = {
  total: 75,
};
