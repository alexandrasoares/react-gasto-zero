import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/navbar.component';
import Card from '../components/card.component';
import Button from '../components/button.component';
import ErrorState from '../components/error-state.component';
import { rewardsService } from '../services/rewards.service';
import { REWARDS_CONSTANTS } from '../constants/rewards.constant';
import { Reward, UserPoints } from '../interfaces/rewards.interface';
import { getErrorMessage } from '../utils/api';

interface RewardsProps {
  onNavigate?: (path: string) => void;
}

const Rewards: React.FC<RewardsProps> = ({ onNavigate }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<string | null>(null);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [rewardsResponse, pointsResponse] = await Promise.all([
        rewardsService.getRewards(),
        rewardsService.getUserPoints(),
      ]);
      setRewards(rewardsResponse.data);
      setUserPoints(pointsResponse.data);
    } catch (err) {
      console.error('Error fetching rewards data:', err);
      setError(getErrorMessage(err, 'Failed to load rewards data.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUnlock = async (rewardId: string) => {
    setUnlocking(rewardId);
    setUnlockError(null);
    try {
      await rewardsService.unlockReward(rewardId);
      setUnlocked(rewardId);
      setRewards(prev =>
        prev.map(reward => (reward.id === rewardId ? { ...reward, unlocked: true } : reward))
      );
      setTimeout(() => setUnlocked(null), 3000);
    } catch (err) {
      console.error('Error unlocking reward:', err);
      setUnlockError(getErrorMessage(err, 'Failed to unlock reward. Please try again.'));
    } finally {
      setUnlocking(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          brand={REWARDS_CONSTANTS.NAVIGATION.BRAND}
          links={REWARDS_CONSTANTS.NAVIGATION.LINKS}
          activePath="/rewards"
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
          brand={REWARDS_CONSTANTS.NAVIGATION.BRAND}
          links={REWARDS_CONSTANTS.NAVIGATION.LINKS}
          activePath="/rewards"
          onNavigate={onNavigate}
        />
        <ErrorState message={error} onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        brand={REWARDS_CONSTANTS.NAVIGATION.BRAND}
        links={REWARDS_CONSTANTS.NAVIGATION.LINKS}
        activePath="/rewards"
        onNavigate={onNavigate}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {REWARDS_CONSTANTS.PAGE_TITLE}
        </h1>

        {unlockError && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {unlockError}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {REWARDS_CONSTANTS.AVAILABLE_REWARDS.TITLE}
            </h2>
            <div className="space-y-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-green-400 to-blue-500"></div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {reward.pointsRequired} Points
                      </span>
                      {reward.unlocked ? (
                        <span className="text-green-600 font-semibold">Unlocked</span>
                      ) : (
                        <Button
                          onClick={() => handleUnlock(reward.id)}
                          loading={unlocking === reward.id}
                          disabled={userPoints?.total ? userPoints.total < reward.pointsRequired : true}
                          className="text-sm"
                        >
                          {unlocked === reward.id
                            ? 'Unlocked!'
                            : `${REWARDS_CONSTANTS.AVAILABLE_REWARDS.UNLOCK_BUTTON} (${reward.pointsRequired} Points)`
                          }
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {REWARDS_CONSTANTS.YOUR_POINTS.TITLE}
              </h2>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {REWARDS_CONSTANTS.YOUR_POINTS.TOTAL_POINTS}
                </p>
                <p className="text-5xl font-bold text-green-600">{userPoints?.total}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Progress to next reward:</p>
                {rewards.filter(r => !r.unlocked).length > 0 && (
                  <div className="space-y-3">
                    {rewards
                      .filter(r => !r.unlocked)
                      .slice(0, 2)
                      .map((reward) => {
                        const progress = Math.min(
                          ((userPoints?.total || 0) / reward.pointsRequired) * 100,
                          100
                        );
                        return (
                          <div key={reward.id}>
                            <p className="text-xs text-gray-600 mb-1">{reward.title}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {reward.pointsRequired - (userPoints?.total || 0)} more points needed
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
