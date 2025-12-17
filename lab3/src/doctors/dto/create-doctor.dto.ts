import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО врача' })
  fullName: string;

  @ApiProperty({ example: 'Терапевт', description: 'Специализация врача' })
  specialization: string;

  @ApiProperty({ example: 1, description: 'ID поликлиники, где работает врач' })
  clinicId: number;
}