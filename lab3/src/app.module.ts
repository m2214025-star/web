import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsModule } from './clinics/clinics.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    // Подключение к PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'polyclinic_user',
      password: 'password123',
      database: 'polyclinic',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, 
      logging: true,
    }),
    
    ClinicsModule,
    DoctorsModule,
    PatientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}