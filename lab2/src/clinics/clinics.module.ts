import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
    controllers: [ClinicsController],
    providers: [ClinicsService],
    imports: [DatasourceModule],
})
export class ClinicsModule {}