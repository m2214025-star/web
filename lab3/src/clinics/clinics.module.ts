import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { Clinic } from './entities/clinic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clinic]), // Регистрируем сущность Clinic
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService],
})
export class ClinicsModule {}