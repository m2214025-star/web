import { ApiProperty } from '@nestjs/swagger';

export class ClinicInfoDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  id: number;

  @ApiProperty({ example: 'Городская поликлиника №1', description: 'Название поликлиники' })
  name: string;

  @ApiProperty({ example: '+7 (495) 123-45-67', description: 'Телефон поликлиники' })
  phone: string;
}