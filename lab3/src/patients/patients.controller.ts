import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';

@ApiTags('Пациенты')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: 'Создание нового пациента' })
  @ApiResponse({ 
    status: 201, 
    description: 'Пациент успешно создан', 
    type: Patient 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Врач не найден' 
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOperation({ summary: 'Получение списка всех пациентов' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список пациентов', 
    type: [Patient] 
  })
  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @ApiOperation({ summary: 'Получение пациента по ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Пациент найден', 
    type: Patient 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Пациент не найден' 
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление информации о пациенте' })
  @ApiResponse({ 
    status: 200, 
    description: 'Пациент обновлен', 
    type: Patient 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Пациент или врач не найден' 
  })
  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updatePatientDto: CreatePatientDto
  ): Promise<Patient> {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @ApiOperation({ summary: 'Удаление пациента' })
  @ApiResponse({ 
    status: 204, 
    description: 'Пациент успешно удален' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Пациент не найден' 
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.patientsService.remove(+id);
  }
}