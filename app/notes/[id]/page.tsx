import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetails({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  // Перевірка та валідація id
  if (!params?.id) {
    return <p>Invalid note ID</p>;
  }

  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return <p>Invalid note ID</p>;
  }

  // Завантаження нотатки
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}