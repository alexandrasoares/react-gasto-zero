import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.component';
import Card from '../components/card.component';
import Button from '../components/button.component';
import { rewardsService } from '../services/rewards.service';
import { REWARDS_CONSTANTS } from '../constants/rewards.constant';
import { Reward, UserPoints } from '../interfaces/rewards.interface';
import { useLanguageChange } from '../hooks/useLanguageChange';

interface RewardsProps {
  onNavigate?: (path: string) => void;
}

const Rewards: React.FC<RewardsProps> = ({ onNavigate }) => {
  const { t } = useLanguageChange();
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
          <div className="text-gray-500">{t('loading')}</div>
        </div>
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
          {t('rewards.title')}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('rewards.availableRewards')}
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
                        {reward.pointsRequired} {t('rewards.points')}
                      </span>
                      {reward.unlocked ? (
                        <span className="text-green-600 font-semibold">{t('rewards.unlocked')}</span>
                      ) : (
                        <Button
                          onClick={() => handleUnlock(reward.id)}
                          loading={unlocking === reward.id}
                          disabled={userPoints?.total ? userPoints.total < reward.pointsRequired : true}
                          className="text-sm"
                        >
                          {unlocked === reward.id
                            ? t('rewards.unlocked')
                            : `${t('rewards.unlock')} (${reward.pointsRequired} ${t('rewards.points')})`
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
                {t('rewards.yourPoints')}
              </h2>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {t('rewards.totalPoints')}
                </p>
                <p className="text-5xl font-bold text-green-600">{userPoints?.total}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">{t('rewards.progressToNextReward')}</p>
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
                              {reward.pointsRequired - (userPoints?.total || 0)} {t('rewards.morePointsNeeded')}
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
