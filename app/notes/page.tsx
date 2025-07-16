import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "./[id]/NoteDetails.client";
import styles from './[id]/NoteDetails.module.css';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const noteId = Number(resolvedParams.id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.container}>
        <div className={styles.item}>
          <NoteDetails noteId={noteId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
