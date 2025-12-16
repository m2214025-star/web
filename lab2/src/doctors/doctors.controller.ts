import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';

@Controller('doctors') // базовый путь будет /api/doctors
export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) {}

    // GET /api/doctors - получить всех врачей
    @Get()
    findAll() {
        return this.doctorsService.findAll();
    }

    // GET /api/doctors/:id - получить врача по ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.doctorsService.findOne(+id); // +id преобразует строку в число
    }

    // POST /api/doctors - создать нового врача
    @Post()
    create(@Body() createDoctor: Doctor) {
        return this.doctorsService.create(createDoctor);
    }

    // PUT /api/doctors/:id - обновить данные врача
    @Put(':id')
    update(@Param('id') id: string, @Body() updateDoctor: Doctor) {
        return this.doctorsService.update(+id, updateDoctor);
    }

    // DELETE /api/doctors/:id - удалить врача
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.doctorsService.remove(+id);
    }
}