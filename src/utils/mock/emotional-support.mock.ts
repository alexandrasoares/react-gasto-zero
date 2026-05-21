import { SelfControlTip, ProgressData } from '../../interfaces/emotional-support.interface';

export const selfControlTipsMock: SelfControlTip[] = [
  {
    id: '1',
    text: 'Take a deep breath and count to ten.',
    checked: false,
  },
  {
    id: '2',
    text: 'Distract yourself with a different activity.',
    checked: false,
  },
  {
    id: '3',
    text: 'Reflect on your long-term financial goals.',
    checked: false,
  },
];

export const progressDataMock: ProgressData = {
  daysSinceLastImpulsePurchase: 15,
  goalsAchieved: 3,
};
