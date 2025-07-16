import NotesClient from "./notes/Notes.client";

import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/types/note";
import styles from "./notes/[id]/NoteDetails.module.css";

export default async function NotesPage() {
  // Завантаження даних на сервері
  const initialData: FetchNotesResponse = await fetchNotes({
    page: 1,
    query: "",
    perPage: 12,
  });

  return (
    <div className={styles.notesPageWrapper}>
      <div className={styles.pageContainer}>
        <NotesClient initialData={initialData} />
      </div>
    </div>
  );
}