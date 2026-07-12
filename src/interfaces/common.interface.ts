export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface NavigationItem {
  label: string;
  path: string;
}

export interface TabItem {
  label: string;
  value: string;
}
