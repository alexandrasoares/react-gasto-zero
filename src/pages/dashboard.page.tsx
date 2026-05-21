import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.component';
import Card from '../components/card.component';
import { dashboardService } from '../services/dashboard.service';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constant';
import { DashboardStats } from '../interfaces/dashboard.interface';

interface DashboardProps {
  onNavigate?: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await dashboardService.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
          brand={DASHBOARD_CONSTANTS.NAVIGATION.BRAND}
          links={DASHBOARD_CONSTANTS.NAVIGATION.LINKS}
          activePath="/dashboard"
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
        brand={DASHBOARD_CONSTANTS.NAVIGATION.BRAND}
        links={DASHBOARD_CONSTANTS.NAVIGATION.LINKS}
        activePath="/dashboard"
        onNavigate={onNavigate}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {DASHBOARD_CONSTANTS.PAGE_TITLE}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">{DASHBOARD_CONSTANTS.STATS.TOTAL_SAVINGS}</p>
            <p className="text-3xl font-bold text-green-600">${stats?.totalSavings}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">{DASHBOARD_CONSTANTS.STATS.GOALS_ACHIEVED}</p>
            <p className="text-3xl font-bold text-blue-600">{stats?.goalsAchieved}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">{DASHBOARD_CONSTANTS.STATS.CURRENT_STREAK}</p>
            <p className="text-3xl font-bold text-purple-600">{stats?.currentStreak}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">{DASHBOARD_CONSTANTS.STATS.ACTIVE_GOALS}</p>
            <p className="text-3xl font-bold text-orange-600">{stats?.activeGoals}</p>
          </Card>
        </div>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome Back!</h2>
          <p className="text-gray-600">
            You're doing great! Keep tracking your spending and achieving your financial goals.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
