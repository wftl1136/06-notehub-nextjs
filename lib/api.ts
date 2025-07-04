import axios from "axios";
import type { FetchNotesResponse, Note, CreateNoteRequest } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseURL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchNotes = async ({
  page = 1,
  query = "",
  perPage = 12,
}: {
  page?: number;
  query?: string;
  perPage?: number;
}): Promise<FetchNotesResponse> => {
  const params: { page: string; search?: string; perPage?: string } = {
    page: page.toString(),
  };
  if (query) params.search = query;
  if (perPage) params.perPage = perPage.toString();

  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
};

export async function fetchNoteById(id: number): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  const response = await api.post<Note>("/notes", note);
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}