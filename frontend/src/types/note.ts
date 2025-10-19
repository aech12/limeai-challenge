export interface Note {
  id: number;
  text_content: string | null;
  audio_url: string | null;
  transcription: string | null;
  summary: string | null;
  created_at: string;
}
