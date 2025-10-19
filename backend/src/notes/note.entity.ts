import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Patient, (patient) => patient.notes)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ nullable: true })
  text_content: string;

  @Column({ nullable: true })
  audio_url: string;

  @Column({ nullable: true })
  transcription: string;

  @Column({ nullable: true })
  summary: string;

  @CreateDateColumn()
  created_at: Date;
}
