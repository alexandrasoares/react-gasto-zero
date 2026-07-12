import React from 'react';
import { TabItem } from '../interfaces/common.interface';

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.value
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
