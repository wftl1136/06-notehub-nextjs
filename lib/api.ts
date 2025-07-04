import axios from "axios";
import { Note, CreateNoteRequest } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseURL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  query = "",
  perPage = 12,
}: {
  page?: number;
  query?: string;
  perPage?: number;
}): Promise<FetchNotesResponse> => {
  try {
    const params: { page: string; search?: string; perPage?: string } = {
      page: page.toString(),
    };
    if (query) {
      params.search = query;
    }
    if (perPage) {
      params.perPage = perPage.toString();
    }
    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export async function fetchNoteById(id: number): Promise<Note> {
  try {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw new Error("Failed to fetch note");
  }
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  try {
    const response = await api.post<Note>("/notes", note);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note");
  }
}

export async function deleteNote(id: number): Promise<Note> {
  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note");
  }
}