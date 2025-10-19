import React, { useState } from "react";
import { createNote } from "../services/api";
import styles from "./NoteForm.module.css";

interface NoteFormProps {
  patientId: number;
  onNoteCreated: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ patientId, onNoteCreated }) => {
  const [textContent, setTextContent] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTextContent(e.target.value);

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!textContent && !audioFile) {
      setError("Please enter text or upload an audio file");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("text_content", textContent);
      if (audioFile) formData.append("audio", audioFile);

      await createNote(patientId, formData);

      setTextContent("");
      setAudioFile(null);
      onNoteCreated();
    } catch (err) {
      console.error(err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add Note</h3>

      <div className={styles.formGroup}>
        <label htmlFor="text">Note Text</label>
        <textarea
          id="text"
          value={textContent}
          onChange={handleTextChange}
          placeholder="Enter note text..."
          rows={4}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="audio">Audio File</label>
        <input id="audio" type="file" accept="audio/*" onChange={handleAudioChange} />
        {audioFile && <p className={styles.fileName}>File: {audioFile.name}</p>}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? "Creating..." : "Create Note"}
      </button>
    </form>
  );
};

export default NoteForm;
