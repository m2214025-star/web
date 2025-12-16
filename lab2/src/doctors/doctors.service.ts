import { Injectable, NotFoundException } from '@nestjs/common';
import { Doctor } from './entities/doctor.entity';
import { DatasourceService } from 'src/datasource/datasource.service';

@Injectable()
export class DoctorsService {
    constructor(private readonly datasourceService: DatasourceService) {}

    create(doctor: Doctor): Doctor {
        this.datasourceService.getDoctors().push(doctor);
        return doctor;
    }

    findOne(id: number): Doctor {
        const doctor = this.datasourceService
            .getDoctors()
            .find((doctor) => doctor.id === id);
        
        if (!doctor) {
            throw new NotFoundException(`Врач с ID ${id} не найден`);
        }
        
        return doctor;
    }

    findAll(): Doctor[] {
        return this.datasourceService.getDoctors();
    }

    update(id: number, updatedDoctor: Doctor): Doctor {
        const doctors = this.datasourceService.getDoctors();
        const index = doctors.findIndex((doctor) => doctor.id === id);
        
        if (index === -1) {
            throw new NotFoundException(`Врач с ID ${id} не найден`);
        }
        
        doctors[index] = updatedDoctor;
        return doctors[index];
    }

    remove(id: number): string {
        const doctors = this.datasourceService.getDoctors();
        const index = doctors.findIndex((doctor) => doctor.id === id);
        
        if (index === -1) {
            throw new NotFoundException(`Врач с ID ${id} не найден`);
        }
        
        doctors.splice(index, 1);
        return `Врач с ID ${id} был удален`;
    }
}