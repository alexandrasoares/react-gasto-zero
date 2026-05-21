import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.component';
import Tabs from '../components/tabs.component';
import TimelineCard from '../components/timeline-card.component';
import Pagination from '../components/pagination.component';
import { behavioralHistoryService } from '../services/behavioral-history.service';
import { BEHAVIORAL_HISTORY_CONSTANTS } from '../constants/behavioral-history.constant';
import { TimelineEntry } from '../interfaces/behavioral-history.interface';
import { useLanguageChange } from '../hooks/useLanguageChange';

interface BehavioralHistoryProps {
  onNavigate?: (path: string) => void;
}

const BehavioralHistory: React.FC<BehavioralHistoryProps> = ({ onNavigate }) => {
  const { t } = useLanguageChange();
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timeline');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await behavioralHistoryService.getTimelineEntries();
        setTimelineEntries(response.data);
      } catch (error) {
        console.error('Error fetching timeline entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(timelineEntries.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = timelineEntries.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          brand={BEHAVIORAL_HISTORY_CONSTANTS.NAVIGATION.BRAND}
          links={BEHAVIORAL_HISTORY_CONSTANTS.NAVIGATION.LINKS}
          activePath="/history"
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
        brand={BEHAVIORAL_HISTORY_CONSTANTS.NAVIGATION.BRAND}
        links={BEHAVIORAL_HISTORY_CONSTANTS.NAVIGATION.LINKS}
        activePath="/history"
        onNavigate={onNavigate}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {t('behavioralHistory.title')}
        </h1>
        
        <Tabs
          tabs={[
            { value: 'timeline', label: t('behavioralHistory.timeline') },
            { value: 'insights', label: t('behavioralHistory.insights') },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        {activeTab === 'timeline' && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('behavioralHistory.timeline')}
            </h2>
            <div className="space-y-4">
              {currentEntries.map((entry) => (
                <TimelineCard key={entry.id} entry={entry} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                prevLabel={t('behavioralHistory.prev')}
                nextLabel={t('behavioralHistory.next')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BehavioralHistory;
