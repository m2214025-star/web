import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { Doctor } from './entities/doctor.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Clinic]), // Регистрируем сущности
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}