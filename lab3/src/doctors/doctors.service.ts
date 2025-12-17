import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Clinic } from 'src/clinics/entities/clinic.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  // Создание врача
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    // Находим поликлинику
    const clinic = await this.clinicRepository.findOne({
      where: { id: createDoctorDto.clinicId },
    });
    
    if (!clinic) {
      throw new NotFoundException(`Поликлиника с ID ${createDoctorDto.clinicId} не найдена`);
    }
    
    // Создаем врача
    const doctor = this.doctorRepository.create({
      fullName: createDoctorDto.fullName,
      specialization: createDoctorDto.specialization,
      clinic: clinic,
    });
    
    return await this.doctorRepository.save(doctor);
  }

  // Получение всех врачей
  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find({
      relations: ['clinic', 'patients'],
    });
  }

  // Получение врача по ID
  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['clinic', 'patients'],
    });
    
    if (!doctor) {
      throw new NotFoundException(`Врач с ID ${id} не найден`);
    }
    
    return doctor;
  }

  // Обновление врача
  async update(id: number, updateDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);
    
    // Если меняется поликлиника
    if (updateDoctorDto.clinicId !== doctor.clinic.id) {
      const clinic = await this.clinicRepository.findOne({
        where: { id: updateDoctorDto.clinicId },
      });
      
      if (!clinic) {
        throw new NotFoundException(`Поликлиника с ID ${updateDoctorDto.clinicId} не найдена`);
      }
      
      doctor.clinic = clinic;
    }
    
    doctor.fullName = updateDoctorDto.fullName;
    doctor.specialization = updateDoctorDto.specialization;
    
    return await this.doctorRepository.save(doctor);
  }

  // Удаление врача
  async remove(id: number): Promise<void> {
    const result = await this.doctorRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Врач с ID ${id} не найден`);
    }
  }
}