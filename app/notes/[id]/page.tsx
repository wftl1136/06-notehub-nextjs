import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';
import styles from './NoteDetails.module.css';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function NotePage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const noteId = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
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