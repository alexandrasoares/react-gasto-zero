export interface GoalFormData {
  name: string;
  description: string;
  duration: number;
  category: string;
  goalType: 'personal' | 'weekly';
}
