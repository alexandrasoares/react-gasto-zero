import React from 'react';
import { TimelineEntry } from '../interfaces/behavioral-history.interface';

interface TimelineCardProps {
  entry: TimelineEntry;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ entry }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-900 font-medium">{entry.action}</p>
          <p className="text-sm text-gray-500 mt-1">{entry.date}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {entry.category}
        </span>
      </div>
    </div>
  );
};

export default TimelineCard;
