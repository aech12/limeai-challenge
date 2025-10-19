import type { Note } from "./note";

export interface Patient {
  id: number;
  patient_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  notes: Note[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}
