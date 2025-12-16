import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './entities/patient.entity';
import { DatasourceService } from 'src/datasource/datasource.service';

@Injectable()
export class PatientsService {
    constructor(private readonly datasourceService: DatasourceService) {}

    create(patient: Patient): Patient {
        this.datasourceService.getPatients().push(patient);
        return patient;
    }

    findOne(id: number): Patient {
        const patient = this.datasourceService
            .getPatients()
            .find((patient) => patient.id === id);
        
        if (!patient) {
            throw new NotFoundException(`Пациент с ID ${id} не найден`);
        }
        
        return patient;
    }

    findAll(): Patient[] {
        return this.datasourceService.getPatients();
    }

    update(id: number, updatedPatient: Patient): Patient {
        const patients = this.datasourceService.getPatients();
        const index = patients.findIndex((patient) => patient.id === id);
        
        if (index === -1) {
            throw new NotFoundException(`Пациент с ID ${id} не найден`);
        }
        
        patients[index] = updatedPatient;
        return patients[index];
    }

    remove(id: number): string {
        const patients = this.datasourceService.getPatients();
        const index = patients.findIndex((patient) => patient.id === id);
        
        if (index === -1) {
            throw new NotFoundException(`Пациент с ID ${id} не найден`);
        }
        
        patients.splice(index, 1);
        return `Пациент с ID ${id} был удален`;
    }
}