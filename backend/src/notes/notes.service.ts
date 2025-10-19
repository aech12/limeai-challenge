import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { File } from 'node:buffer';

if (!globalThis.File) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  globalThis.File = File as any;
}

@Injectable()
export class NotesService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(
    patient_id: number,
    data: { text_content?: string },
    file?: Express.Multer.File,
  ): Promise<Note> {
    let finalText = data.text_content;

    if (file) {
      // Create a temporary file from the buffer
      const tempDir = path.join(process.cwd(), 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const tempFilePath = path.join(tempDir, `audio-${Date.now()}.wav`);
      fs.writeFileSync(tempFilePath, file.buffer);

      try {
        // Pass the file path directly to OpenAI
        const transcription = await this.openai.audio.transcriptions.create({
          model: 'gpt-4o-mini-transcribe',
          file: fs.createReadStream(tempFilePath),
          response_format: 'text',
        });

        finalText = transcription;
      } finally {
        // Clean up the temporary file
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      }
    }

    const note = this.notesRepository.create({
      patient: { id: patient_id },
      text_content: finalText,
      audio_url: file ? file.filename : undefined,
    });

    return this.notesRepository.save(note);
  }

  async findByPatient(patient_id: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: { patient: { id: patient_id } },
      order: { created_at: 'DESC' },
    });
  }
}
