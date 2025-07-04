'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const getTagClassName = (tag: Note['tag']) => {
  switch (tag) {
    case 'Todo':
      return `${css.tag} ${css.todo}`;
    case 'Work':
      return `${css.tag} ${css.work}`;
    case 'Personal':
      return `${css.tag} ${css.personal}`;
    case 'Meeting':
      return `${css.tag} ${css.meeting}`;
    case 'Shopping':
      return `${css.tag} ${css.shopping}`;
    default:
  return css.tag;
  }
};

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  if (!notes.length) {
    return <p>No notes found.</p>;
  }
  
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <div className={css.meta}>
            <span className={getTagClassName(note.tag)}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            </div>
            <button 
              onClick={() => handleDelete(note.id)}
              className={css.deleteButton}
              disabled={mutation.isPending && mutation.variables === note.id}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList; 