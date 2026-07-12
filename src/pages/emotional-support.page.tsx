import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/navbar.component';
import Card from '../components/card.component';
import Button from '../components/button.component';
import ErrorState from '../components/error-state.component';
import { emotionalSupportService } from '../services/emotional-support.service';
import { EMOTIONAL_SUPPORT_CONSTANTS } from '../constants/emotional-support.constant';
import { SelfControlTip, ProgressData } from '../interfaces/emotional-support.interface';
import { getErrorMessage } from '../utils/api';

interface EmotionalSupportProps {
  onNavigate?: (path: string) => void;
}

const EmotionalSupport: React.FC<EmotionalSupportProps> = ({ onNavigate }) => {
  const [selfControlTips, setSelfControlTips] = useState<SelfControlTip[]>([]);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [commitment, setCommitment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [tipsResponse, progressResponse] = await Promise.all([
        emotionalSupportService.getSelfControlTips(),
        emotionalSupportService.getProgressData(),
      ]);
      setSelfControlTips(tipsResponse.data);
      setProgressData(progressResponse.data);
    } catch (err) {
      console.error('Error fetching emotional support data:', err);
      setError(getErrorMessage(err, 'Failed to load emotional support data.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTipToggle = (id: string) => {
    setSelfControlTips(prev =>
      prev.map(tip => (tip.id === id ? { ...tip, checked: !tip.checked } : tip))
    );
  };

  const handleSaveCommitment = async () => {
    if (!commitment.trim()) return;

    setSaving(true);
    setSaveError(null);
    try {
      await emotionalSupportService.saveCommitment(commitment);
      setSaved(true);
      setCommitment('');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving commitment:', err);
      setSaveError(getErrorMessage(err, 'Failed to save commitment. Please try again.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          brand={EMOTIONAL_SUPPORT_CONSTANTS.NAVIGATION.BRAND}
          links={EMOTIONAL_SUPPORT_CONSTANTS.NAVIGATION.LINKS}
          activePath="/support"
          onNavigate={onNavigate}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          brand={EMOTIONAL_SUPPORT_CONSTANTS.NAVIGATION.BRAND}
          links={EMOTIONAL_SUPPORT_CONSTANTS.NAVIGATION.LINKS}
          activePath="/support"
          onNavigate={onNavigate}
        />
        <ErrorState message={error} onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        brand={EMOTIONAL_SUPPORT_CONSTANTS.NAVIGATION.BRAND}
        links={EMOTIONAL_SUPPORT_CONSTANTS.NAVIGATION.LINKS}
        activePath="/support"
        onNavigate={onNavigate}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {EMOTIONAL_SUPPORT_CONSTANTS.PAGE_TITLE}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {EMOTIONAL_SUPPORT_CONSTANTS.SELF_CONTROL_TIPS.TITLE}
              </h2>
              <div className="space-y-3">
                {selfControlTips.map((tip) => (
                  <label key={tip.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tip.checked}
                      onChange={() => handleTipToggle(tip.id)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-gray-700">{tip.text}</span>
                  </label>
                ))}
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {EMOTIONAL_SUPPORT_CONSTANTS.MOTIVATIONAL_PHRASES.TITLE}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {EMOTIONAL_SUPPORT_CONSTANTS.MOTIVATIONAL_PHRASES.TEXT}
              </p>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {EMOTIONAL_SUPPORT_CONSTANTS.COMMITMENT_DEVICE.TITLE}
              </h2>
              <div className="space-y-4">
                <textarea
                  placeholder={EMOTIONAL_SUPPORT_CONSTANTS.COMMITMENT_DEVICE.PLACEHOLDER}
                  value={commitment}
                  onChange={(e) => setCommitment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={4}
                />
                {saveError && (
                  <p role="alert" className="text-sm text-red-600">
                    {saveError}
                  </p>
                )}
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveCommitment}
                    loading={saving}
                    disabled={!commitment.trim()}
                  >
                    {saved ? 'Saved!' : EMOTIONAL_SUPPORT_CONSTANTS.COMMITMENT_DEVICE.BUTTON}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {EMOTIONAL_SUPPORT_CONSTANTS.PROGRESS_SUMMARY.TITLE}
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">
                    {EMOTIONAL_SUPPORT_CONSTANTS.PROGRESS_SUMMARY.DAYS_SINCE_LAST_IMPULSE_PURCHASE}
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {progressData?.daysSinceLastImpulsePurchase}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">
                    {EMOTIONAL_SUPPORT_CONSTANTS.PROGRESS_SUMMARY.GOALS_ACHIEVED}
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {progressData?.goalsAchieved}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalSupport;
