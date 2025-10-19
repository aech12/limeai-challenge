import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('patient/:patient_id')
  async create(
    @Param('patient_id') patient_id: string,
    @Body() data: { text_content?: string; audio_url?: string },
  ): Promise<Note> {
    return this.notesService.create(parseInt(patient_id, 10), data);
  }

  @Get('patient/:patient_id')
  async findByPatient(
    @Param('patient_id') patient_id: string,
  ): Promise<Note[]> {
    return this.notesService.findByPatient(parseInt(patient_id, 10));
  }
}
