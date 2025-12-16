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
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { Clinic } from './entities/clinic.entity';
import { ClinicInfoDto } from './dto/clinic-info.dto';

@ApiTags('Поликлиники')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @ApiOperation({ summary: 'Создание поликлиники' })
  @ApiResponse({ status: 201, description: 'Поликлиника успешно создана', type: Clinic })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createClinicDto: CreateClinicDto): Promise<Clinic> {
    return this.clinicsService.create(createClinicDto);
  }

  @ApiOperation({ summary: 'Получение всех поликлиник (полная информация)' })
  @ApiResponse({ status: 200, description: 'Список поликлиник', type: [Clinic] })
  @Get()
  findAll(): Promise<Clinic[]> {
    return this.clinicsService.findAll();
  }

  @ApiOperation({ summary: 'Получение списка поликлиник (упрощенная информация)' })
  @ApiResponse({ status: 200, description: 'Список поликлиник (только id, name, phone)', type: [ClinicInfoDto] })
  @Get('info')
  findInfo(): Promise<ClinicInfoDto[]> {
    return this.clinicsService.findInfo();
  }

  @ApiOperation({ summary: 'Получение поликлиники по ID' })
  @ApiResponse({ status: 200, description: 'Поликлиника найдена', type: Clinic })
  @ApiResponse({ status: 404, description: 'Поликлиника не найдена' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Clinic> {
    return this.clinicsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление информации о поликлинике' })
  @ApiResponse({ status: 200, description: 'Поликлиника обновлена', type: Clinic })
  @ApiResponse({ status: 404, description: 'Поликлиника не найдена' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClinicDto: CreateClinicDto): Promise<Clinic> {
    return this.clinicsService.update(+id, updateClinicDto);
  }

  @ApiOperation({ summary: 'Удаление поликлиники' })
  @ApiResponse({ status: 204, description: 'Поликлиника удалена' })
  @ApiResponse({ status: 404, description: 'Поликлиника не найдена' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.clinicsService.remove(+id);
  }
}