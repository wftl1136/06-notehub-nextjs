"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/app/notes/";

interface NotesClientProps {
  initialData: FetchNotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

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

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes..."
      />
      <ul>
        {data?.notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}