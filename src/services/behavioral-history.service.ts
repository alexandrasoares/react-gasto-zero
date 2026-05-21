import { TimelineEntry, ApiResponse } from '../interfaces/behavioral-history.interface';
import { timelineEntriesMock } from '../utils/mock/behavioral-history.mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const behavioralHistoryService = {
  getTimelineEntries: async (): Promise<ApiResponse<TimelineEntry[]>> => {
    await delay(800);
    return {
      data: timelineEntriesMock,
      status: 200,
      message: 'Success',
    };
  },
};
