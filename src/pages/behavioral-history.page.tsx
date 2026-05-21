import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.component';
import Tabs from '../components/tabs.component';
import TimelineCard from '../components/timeline-card.component';
import Pagination from '../components/pagination.component';
import { behavioralHistoryService } from '../services/behavioral-history.service';
import { BEHAVIORAL_HISTORY_CONSTANTS } from '../constants/behavioral-history.constant';
import { TimelineEntry } from '../interfaces/behavioral-history.interface';

interface BehavioralHistoryProps {
  onNavigate?: (path: string) => void;
}

const BehavioralHistory: React.FC<BehavioralHistoryProps> = ({ onNavigate }) => {
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

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
          <div className="text-gray-500">Loading...</div>
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
          {BEHAVIORAL_HISTORY_CONSTANTS.PAGE_TITLE}
        </h1>
        
        <Tabs
          tabs={BEHAVIORAL_HISTORY_CONSTANTS.TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {BEHAVIORAL_HISTORY_CONSTANTS.TIMELINE_SECTION.TITLE}
          </h2>
          
          <div className="space-y-4">
            {currentEntries.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
        
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            prevLabel={BEHAVIORAL_HISTORY_CONSTANTS.PAGINATION.PREV}
            nextLabel={BEHAVIORAL_HISTORY_CONSTANTS.PAGINATION.NEXT}
          />
        )}
      </div>
    </div>
  );
};

export default BehavioralHistory;
