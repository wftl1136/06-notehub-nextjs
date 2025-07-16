"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";

interface NotesClientProps {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [debouncedSearch] = useDebounce(search, 300);

  const { data } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        page,
        query: debouncedSearch,
        perPage: 12,
      }),
    initialData,
    placeholderData: initialData,
    keepPreviousData: true,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Скидаємо сторінку при новому запиті
  };

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />
      <NoteList notes={notes} onNoteClick={(note) => setSelectedNote(note)} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  );
}