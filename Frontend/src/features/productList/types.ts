export interface Params {
  limit: number;
  skip: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface SortSettings {
  column: string;
  direction: 'asc' | 'desc';
}