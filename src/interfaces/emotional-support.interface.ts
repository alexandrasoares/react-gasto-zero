export interface SelfControlTip {
  id: string;
  text: string;
  checked: boolean;
}

export interface ProgressData {
  daysSinceLastImpulsePurchase: number;
  goalsAchieved: number;
}

export interface Commitment {
  text: string;
  savedAt: string;
}
