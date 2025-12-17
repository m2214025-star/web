import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Смирнов Михаил Александрович', description: 'ФИО пациента' })
  fullName: string;

  @ApiProperty({ example: '1990-05-15', description: 'Дата рождения' })
  birthDate: string;

  @ApiProperty({ example: '+7 (916) 123-45-67', description: 'Телефон пациента' })
  phone: string;

  @ApiProperty({ example: 1, description: 'ID лечащего врача' })
  doctorId: number;
}