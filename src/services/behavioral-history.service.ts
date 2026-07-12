import { TimelineEntry, ApiResponse } from '../interfaces/behavioral-history.interface';
import { timelineEntriesMock } from '../utils/mock/behavioral-history.mock';
import { delay, resolveApiResponse } from '../utils/api';

export const behavioralHistoryService = {
  getTimelineEntries: async (): Promise<ApiResponse<TimelineEntry[]>> => {
    await delay(800);
    return resolveApiResponse({
      data: timelineEntriesMock,
      status: 200,
      message: 'Success',
    });
  },
};
