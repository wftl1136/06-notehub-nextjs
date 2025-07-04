import { Note } from './note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

export interface FetchNotesParams {
  page?: number;
  search?: string;
}