import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { Clinic } from './entities/clinic.entity';

@Controller('clinics')
export class ClinicsController {
    constructor(private readonly clinicsService: ClinicsService) {}

    @Get()
    findAll() {
        return this.clinicsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clinicsService.findOne(+id);
    }

    @Post()
    create(@Body() createClinic: Clinic) {
        return this.clinicsService.create(createClinic);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateClinic: Clinic) {
        return this.clinicsService.update(+id, updateClinic);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clinicsService.remove(+id);
    }
}