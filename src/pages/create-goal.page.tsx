import React, { useState } from 'react';
import Navbar from '../components/navbar.component';
import Input from '../components/input.component';
import Button from '../components/button.component';
import { createGoalService } from '../services/create-goal.service';
import { CREATE_GOAL_CONSTANTS } from '../constants/create-goal.constant';
import { GoalFormData } from '../interfaces/create-goal.interface';
import { getErrorMessage } from '../utils/api';

interface CreateGoalProps {
  onNavigate?: (path: string) => void;
}

const CreateGoal: React.FC<CreateGoalProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<GoalFormData>({
    name: '',
    description: '',
    duration: 30,
    category: '',
    goalType: 'personal',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    try {
      await createGoalService.createGoal(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        description: '',
        duration: 30,
        category: '',
        goalType: 'personal',
      });
    } catch (error) {
      console.error('Error creating goal:', error);
      setSubmitError(getErrorMessage(error, 'Failed to create goal. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof GoalFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          brand={CREATE_GOAL_CONSTANTS.NAVIGATION.BRAND}
          links={CREATE_GOAL_CONSTANTS.NAVIGATION.LINKS}
          activePath="/goals"
          onNavigate={onNavigate}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Goal Created Successfully!</h2>
            <Button
              onClick={() => setSubmitted(false)}
              variant="primary"
            >
              Create Another Goal
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        brand={CREATE_GOAL_CONSTANTS.NAVIGATION.BRAND}
        links={CREATE_GOAL_CONSTANTS.NAVIGATION.LINKS}
        activePath="/goals"
        onNavigate={onNavigate}
      />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {CREATE_GOAL_CONSTANTS.PAGE_TITLE}
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <Input
            label={CREATE_GOAL_CONSTANTS.FORM.GOAL_NAME_LABEL}
            type="text"
            placeholder={CREATE_GOAL_CONSTANTS.FORM.GOAL_NAME_PLACEHOLDER}
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
          />
          
          <Input
            label={CREATE_GOAL_CONSTANTS.FORM.DESCRIPTION_LABEL}
            type="textarea"
            placeholder={CREATE_GOAL_CONSTANTS.FORM.DESCRIPTION_PLACEHOLDER}
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
          />
          
          <Input
            label={CREATE_GOAL_CONSTANTS.FORM.DURATION_LABEL}
            type="number"
            placeholder={CREATE_GOAL_CONSTANTS.FORM.DURATION_PLACEHOLDER}
            value={formData.duration}
            onChange={(value) => handleInputChange('duration', value)}
          />
          
          <Input
            label={CREATE_GOAL_CONSTANTS.FORM.CATEGORY_LABEL}
            type="text"
            placeholder={CREATE_GOAL_CONSTANTS.FORM.CATEGORY_PLACEHOLDER}
            value={formData.category}
            onChange={(value) => handleInputChange('category', value)}
          />
          
          <div className="flex space-x-4">
            <Button
              type="button"
              variant={formData.goalType === 'personal' ? 'primary' : 'pill'}
              onClick={() => handleInputChange('goalType', 'personal')}
              className="flex-1"
            >
              {CREATE_GOAL_CONSTANTS.FORM.GOAL_TYPE_PERSONAL}
            </Button>
            <Button
              type="button"
              variant={formData.goalType === 'weekly' ? 'primary' : 'pill'}
              onClick={() => handleInputChange('goalType', 'weekly')}
              className="flex-1"
            >
              {CREATE_GOAL_CONSTANTS.FORM.GOAL_TYPE_WEEKLY}
            </Button>
          </div>
          
          {submitError && (
            <p role="alert" className="text-sm text-red-600">
              {submitError}
            </p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!formData.name || !formData.description}
            >
              {CREATE_GOAL_CONSTANTS.FORM.SUBMIT_BUTTON}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGoal;
