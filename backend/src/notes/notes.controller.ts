import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('patient/:patient_id')
  @UseInterceptors(FileInterceptor('audio'))
  async create(
    @Param('patient_id') patient_id: string,
    @UploadedFile() file?: Express.Multer.File,
    @Body('text_content') text_content?: string,
  ): Promise<Note> {
    return this.notesService.create(
      parseInt(patient_id, 10),
      { text_content },
      file,
    );
  }

  @Get('patient/:patient_id')
  async findByPatient(
    @Param('patient_id') patient_id: string,
  ): Promise<Note[]> {
    return this.notesService.findByPatient(parseInt(patient_id, 10));
  }
}
