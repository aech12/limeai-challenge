import type { Note } from "../types/note";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const fetcher = async (url: string) => {
  const res = await fetch(`${API_URL}${url}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const createNote = async (
  patientId: number,
  formData: FormData
): Promise<Note> => {
  const res = await fetch(`${API_URL}/notes/patient/${patientId}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};
