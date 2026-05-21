export interface TimelineEntry {
  id: string;
  action: string;
  date: string;
  category: string;
}

export interface NavigationItem {
  label: string;
  path: string;
}

export interface TabItem {
  label: string;
  value: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
