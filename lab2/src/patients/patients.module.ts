import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  controllers: [PatientsController], // Регистрируем контроллер пациентов
  providers: [PatientsService],      // Регистрируем сервис пациентов
  imports: [DatasourceModule],      // Импортируем модуль источника данных
})
export class PatientsModule {}