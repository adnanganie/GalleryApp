import { Photos } from './photos';

export interface ApiResult {
  page: number;
  per_page: number;
  photos: Photos[];
  next_page: string;
  total_results: number;
}
