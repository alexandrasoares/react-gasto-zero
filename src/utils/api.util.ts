import { ApiResponse } from '../interfaces/common.interface';

export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

interface MockResponseOptions {
  status?: number;
  message?: string;
}

export const mockResponse = <T>(
  data: T,
  { status = 200, message = 'Success' }: MockResponseOptions = {}
): ApiResponse<T> => ({
  data,
  status,
  message,
});
