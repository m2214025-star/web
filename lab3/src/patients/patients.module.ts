import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Doctor]), // Регистрируем сущности
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}