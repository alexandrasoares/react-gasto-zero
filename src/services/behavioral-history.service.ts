import { TimelineEntry } from '../interfaces/behavioral-history.interface';
import { ApiResponse } from '../interfaces/common.interface';
import { delay, mockResponse } from '../utils/api.util';
import { timelineEntriesMock } from '../utils/mock/behavioral-history.mock';

export const behavioralHistoryService = {
  getTimelineEntries: async (): Promise<ApiResponse<TimelineEntry[]>> => {
    await delay(800);
    return mockResponse(timelineEntriesMock);
  },
};
