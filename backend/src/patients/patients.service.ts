import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find({ relations: ['notes'] });
  }

  async findOne(id: number): Promise<Patient | null> {
    return this.patientsRepository.findOne({
      where: { id },
      relations: ['notes'],
    });
  }

  async create(patient: Patient): Promise<Patient> {
    return this.patientsRepository.save(patient);
  }
}
