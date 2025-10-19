import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(
    patient_id: number,
    data: { text_content?: string; audio_url?: string },
  ): Promise<Note> {
    const note = this.notesRepository.create({
      patient: { id: patient_id },
      text_content: data.text_content,
      audio_url: data.audio_url,
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
