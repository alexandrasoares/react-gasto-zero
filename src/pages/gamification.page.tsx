import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.component';
import Card from '../components/card.component';
import { gamificationService } from '../services/gamification.service';
import { GAMIFICATION_CONSTANTS } from '../constants/gamification.constant';
import { GamificationStats, Badge, Achievement, LeaderboardEntry } from '../interfaces/gamification.interface';

interface GamificationProps {
  onNavigate?: (path: string) => void;
}

const Gamification: React.FC<GamificationProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<GamificationStats | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsResponse, badgesResponse, achievementsResponse, leaderboardResponse] = await Promise.all([
          gamificationService.getStats(),
          gamificationService.getBadges(),
          gamificationService.getAchievements(),
          gamificationService.getLeaderboard(),
        ]);
        setStats(statsResponse.data);
        setBadges(badgesResponse.data);
        setAchievements(achievementsResponse.data);
        setLeaderboard(leaderboardResponse.data);
      } catch (error) {
        console.error('Error fetching gamification data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          brand={GAMIFICATION_CONSTANTS.NAVIGATION.BRAND}
          links={GAMIFICATION_CONSTANTS.NAVIGATION.LINKS}
          activePath="/gamification"
          onNavigate={onNavigate}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        brand={GAMIFICATION_CONSTANTS.NAVIGATION.BRAND}
        links={GAMIFICATION_CONSTANTS.NAVIGATION.LINKS}
        activePath="/gamification"
        onNavigate={onNavigate}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {GAMIFICATION_CONSTANTS.PAGE_TITLE}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">{GAMIFICATION_CONSTANTS.STATS.POINTS}</p>
            <p className="text-4xl font-bold text-green-600">{stats?.points}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">{GAMIFICATION_CONSTANTS.STATS.LEVEL}</p>
            <p className="text-4xl font-bold text-blue-600">{stats?.level}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">{GAMIFICATION_CONSTANTS.STATS.BADGES}</p>
            <p className="text-4xl font-bold text-purple-600">{stats?.badges}</p>
          </Card>
        </div>
        
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {GAMIFICATION_CONSTANTS.LEVEL_PROGRESS.TITLE}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-green-600 h-4 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-600">{GAMIFICATION_CONSTANTS.LEVEL_PROGRESS.SUBTITLE}</p>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {GAMIFICATION_CONSTANTS.BADGES.TITLE}
            </h2>
            <div className="space-y-4">
              {badges.map((badge) => (
                <Card key={badge.id} className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {GAMIFICATION_CONSTANTS.ACHIEVEMENTS.TITLE}
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${achievement.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {achievement.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {GAMIFICATION_CONSTANTS.LEADERBOARD.TITLE}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {GAMIFICATION_CONSTANTS.LEADERBOARD.RANK}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {GAMIFICATION_CONSTANTS.LEADERBOARD.USER}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {GAMIFICATION_CONSTANTS.LEADERBOARD.POINTS}
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry.rank} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{entry.rank}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{entry.user}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 font-semibold">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Gamification;
