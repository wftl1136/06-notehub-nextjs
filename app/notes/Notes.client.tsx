"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse, Note } from "@/types/note";

interface NotesClientProps {
  initialData: FetchNotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);

  // useQuery с явным типом и строгой защитой
  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page: 1,
        query: debouncedSearch,
        perPage: 12,
      }),
    initialData,
  });

  // data может быть undefined, notes тоже может отсутствовать — добавляем защиту
  const notes: Note[] = data?.notes ?? [];

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes..."
      />
      <ul>
        {notes.length > 0 ? (
          notes.map((note) => <li key={note.id}>{note.title}</li>)
        ) : (
          <li>No notes found</li>
        )}
      </ul>
    </div>
  );
}