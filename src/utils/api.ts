export interface ApiResponseLike<T> {
  data: T;
  status: number;
  message: string;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Ensures a service response represents a successful request before it is
 * handed to callers. Non-2xx responses throw so the error propagates to the
 * caller's catch block instead of being treated as valid data.
 */
export const resolveApiResponse = <T>(response: ApiResponseLike<T>): ApiResponseLike<T> => {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.message || `Request failed with status ${response.status}`);
  }

  return response;
};

/** Normalizes unknown thrown values into a human-readable message. */
export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string' && error) {
    return error;
  }

  return fallback;
};
