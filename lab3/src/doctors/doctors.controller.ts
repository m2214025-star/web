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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@ApiTags('Врачи')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({ summary: 'Создание нового врача' })
  @ApiResponse({ 
    status: 201, 
    description: 'Врач успешно создан', 
    type: Doctor 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Поликлиника не найдена' 
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorsService.create(createDoctorDto);
  }

  @ApiOperation({ summary: 'Получение списка всех врачей' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список врачей', 
    type: [Doctor] 
  })
  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @ApiOperation({ summary: 'Получение врача по ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Врач найден', 
    type: Doctor 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Врач не найден' 
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление информации о враче' })
  @ApiResponse({ 
    status: 200, 
    description: 'Врач обновлен', 
    type: Doctor 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Врач или поликлиника не найдена' 
  })
  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateDoctorDto: CreateDoctorDto
  ): Promise<Doctor> {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @ApiOperation({ summary: 'Удаление врача' })
  @ApiResponse({ 
    status: 204, 
    description: 'Врач успешно удален' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Врач не найден' 
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.doctorsService.remove(+id);
  }
}