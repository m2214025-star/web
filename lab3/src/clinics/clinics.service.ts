import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './entities/clinic.entity';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { ClinicInfoDto } from './dto/clinic-info.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  // Создание поликлиники
  async create(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const clinic = this.clinicRepository.create(createClinicDto);
    return await this.clinicRepository.save(clinic);
  }

  // Получение всех поликлиник (полная информация)
  async findAll(): Promise<Clinic[]> {
    return await this.clinicRepository.find({
      relations: ['doctors'], // Загружаем связанных врачей
    });
  }

  // Получение поликлиник (упрощенная информация)
  async findInfo(): Promise<ClinicInfoDto[]> {
    const clinics = await this.clinicRepository.find();
    
    return clinics.map(clinic => {
      const clinicInfo = new ClinicInfoDto();
      clinicInfo.id = clinic.id;
      clinicInfo.name = clinic.name;
      clinicInfo.phone = clinic.phone;
      return clinicInfo;
    });
  }

  // Получение поликлиники по ID
  async findOne(id: number): Promise<Clinic> {
    const clinic = await this.clinicRepository.findOne({
      where: { id },
      relations: ['doctors'],
    });
    
    if (!clinic) {
      throw new NotFoundException(`Поликлиника с ID ${id} не найдена`);
    }
    
    return clinic;
  }

  // Обновление поликлиники
  async update(id: number, updateClinicDto: CreateClinicDto): Promise<Clinic> {
    const clinic = await this.findOne(id);
    
    clinic.name = updateClinicDto.name;
    clinic.address = updateClinicDto.address;
    clinic.phone = updateClinicDto.phone;
    
    return await this.clinicRepository.save(clinic);
  }

  // Удаление поликлиники
  async remove(id: number): Promise<void> {
    const result = await this.clinicRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Поликлиника с ID ${id} не найдена`);
    }
  }
}