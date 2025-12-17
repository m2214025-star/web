import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  // Создание пациента
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // Находим врача
    const doctor = await this.doctorRepository.findOne({
      where: { id: createPatientDto.doctorId },
    });
    
    if (!doctor) {
      throw new NotFoundException(`Врач с ID ${createPatientDto.doctorId} не найден`);
    }
    
    // Создаем пациента
    const patient = this.patientRepository.create({
      fullName: createPatientDto.fullName,
      birthDate: createPatientDto.birthDate,
      phone: createPatientDto.phone,
      doctor: doctor,
    });
    
    return await this.patientRepository.save(patient);
  }

  // Получение всех пациентов
  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find({
      relations: ['doctor', 'doctor.clinic'],
    });
  }

  // Получение пациента по ID
  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['doctor', 'doctor.clinic'],
    });
    
    if (!patient) {
      throw new NotFoundException(`Пациент с ID ${id} не найден`);
    }
    
    return patient;
  }

  // Обновление пациента
  async update(id: number, updatePatientDto: CreatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);
    
    // Если меняется врач
    if (updatePatientDto.doctorId !== patient.doctor.id) {
      const doctor = await this.doctorRepository.findOne({
        where: { id: updatePatientDto.doctorId },
      });
      
      if (!doctor) {
        throw new NotFoundException(`Врач с ID ${updatePatientDto.doctorId} не найден`);
      }
      
      patient.doctor = doctor;
    }
    
    patient.fullName = updatePatientDto.fullName;
    patient.birthDate = updatePatientDto.birthDate;
    patient.phone = updatePatientDto.phone;
    
    return await this.patientRepository.save(patient);
  }

  // Удаление пациента
  async remove(id: number): Promise<void> {
    const result = await this.patientRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Пациент с ID ${id} не найден`);
    }
  }
}