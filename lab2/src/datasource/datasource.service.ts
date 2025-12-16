import { Injectable } from '@nestjs/common';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Injectable()
export class DatasourceService {
    private clinics: Clinic[] = [];
    private doctors: Doctor[] = [];
    private patients: Patient[] = [];

    getClinics(): Clinic[] {
        return this.clinics;
    }

    getDoctors(): Doctor[] {
        return this.doctors;
    }

    getPatients(): Patient[] {
        return this.patients;
    }
}