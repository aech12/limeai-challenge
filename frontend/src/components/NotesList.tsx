import React from "react";
import { Note } from "../types/note";
import styles from "./NotesList.module.css";

interface NotesListProps {
  notes: Note[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (notes.length === 0) {
    return <p className={styles.empty}>No notes for this patient</p>;
  }

  return (
    <div className={styles.container}>
      <h3>Patient Notes</h3>
      <div className={styles.notesList}>
        {notes.map((note) => (
          <div key={note.id} className={styles.noteItem}>
            <div className={styles.noteDate}>{formatDate(note.created_at)}</div>
            <div className={styles.noteContent}>
              {note.text_content && <p>{note.text_content}</p>}
              {note.audio_url && (
                <p className={styles.audioIndicator}>
                  📄 Audio: {note.audio_url}
                </p>
              )}
              {note.transcription && (
                <div className={styles.section}>
                  <strong>Transcription:</strong>
                  <p>{note.transcription}</p>
                </div>
              )}
              {note.summary && (
                <div className={styles.section}>
                  <strong>Summary:</strong>
                  <p>{note.summary}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
