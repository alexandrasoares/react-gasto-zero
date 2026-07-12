import React, { useState, useEffect } from 'react';
import PageLayout from '../components/page-layout.component';
import Card from '../components/card.component';
import Button from '../components/button.component';
import { rewardsService } from '../services/rewards.service';
import { REWARDS_CONSTANTS } from '../constants/rewards.constant';
import { Reward, UserPoints } from '../interfaces/rewards.interface';

interface RewardsProps {
  onNavigate?: (path: string) => void;
}

const Rewards: React.FC<RewardsProps> = ({ onNavigate }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [rewardsResponse, pointsResponse] = await Promise.all([
          rewardsService.getRewards(),
          rewardsService.getUserPoints(),
        ]);
        setRewards(rewardsResponse.data);
        setUserPoints(pointsResponse.data);
      } catch (error) {
        console.error('Error fetching rewards data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUnlock = async (rewardId: string) => {
    setUnlocking(rewardId);
    try {
      await rewardsService.unlockReward(rewardId);
      setUnlocked(rewardId);
      setRewards(prev =>
        prev.map(reward => (reward.id === rewardId ? { ...reward, unlocked: true } : reward))
      );
      setTimeout(() => setUnlocked(null), 3000);
    } catch (error) {
      console.error('Error unlocking reward:', error);
    } finally {
      setUnlocking(null);
    }
  };

  return (
    <PageLayout
      navigation={REWARDS_CONSTANTS.NAVIGATION}
      activePath="/rewards"
      onNavigate={onNavigate}
      loading={loading}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {REWARDS_CONSTANTS.PAGE_TITLE}
        </h1>
        
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
    </PageLayout>
  );
};

export default Rewards;
