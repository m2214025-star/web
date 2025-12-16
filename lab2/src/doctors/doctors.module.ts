import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  controllers: [DoctorsController], // Регистрируем контроллер врачей
  providers: [DoctorsService],      // Регистрируем сервис врачей
  imports: [DatasourceModule],      // Импортируем модуль источника данных
})
export class DoctorsModule {}