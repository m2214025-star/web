import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';

@Controller('patients') // базовый путь будет /api/patients
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    // GET /api/patients - получить всех пациентов
    @Get()
    findAll() {
        return this.patientsService.findAll();
    }

    // GET /api/patients/:id - получить пациента по ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.patientsService.findOne(+id);
    }

    // POST /api/patients - создать нового пациента
    @Post()
    create(@Body() createPatient: Patient) {
        return this.patientsService.create(createPatient);
    }

    // PUT /api/patients/:id - обновить данные пациента
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePatient: Patient) {
        return this.patientsService.update(+id, updatePatient);
    }

    // DELETE /api/patients/:id - удалить пациента
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.patientsService.remove(+id);
    }
}