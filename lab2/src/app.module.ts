import { Module } from '@nestjs/common';
import { ClinicsModule } from './clinics/clinics.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { DatasourceModule } from './datasource/datasource.module';

@Module({
  imports: [
    ClinicsModule,
    DoctorsModule,
    PatientsModule,
    DatasourceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
