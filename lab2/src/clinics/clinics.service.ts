import { Injectable, NotFoundException } from '@nestjs/common';
import { Clinic } from './entities/clinic.entity';
import { DatasourceService } from 'src/datasource/datasource.service';

@Injectable()
export class ClinicsService {
    constructor(private readonly datasourceService: DatasourceService) {}

    create(clinic: Clinic): Clinic {
        this.datasourceService.getClinics().push(clinic);
        return clinic;
    }

    findOne(id: number): Clinic {
        const clinic = this.datasourceService
            .getClinics()
            .find((clinic) => clinic.id === id);
        
        if (!clinic) {
            throw new NotFoundException(`Клиника с ID ${id} не найдена`);
        }
        
        return clinic;
    }

    findAll(): Clinic[] {
        return this.datasourceService.getClinics();
    }

    update(id: number, updatedClinic: Clinic): Clinic {
        const clinics = this.datasourceService.getClinics();
        const index = clinics.findIndex((clinic) => clinic.id === id);
        
        if (index === -1) {
            throw new NotFoundException(`Клиника с ID ${id} не найдена`);
        }
        
        clinics[index] = updatedClinic;
        return clinics[index];
    }

    remove(id: number): string {
        const clinics = this.datasourceService.getClinics();
        const index = clinics.findIndex((clinic) => clinic.id === id);
        
        if (index === -1) {
            throw new NotFoundException(`Клиника с ID ${id} не найдена`);
        }
        
        clinics.splice(index, 1);
        return `Клиника с ID ${id} была удалена`;
    }
}