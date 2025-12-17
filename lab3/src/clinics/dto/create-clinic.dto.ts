import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicDto {
  @ApiProperty({ example: 'Городская поликлиника №1', description: 'Название поликлиники' })
  name: string;

  @ApiProperty({ example: 'ул. Ленина, 10', description: 'Адрес поликлиники' })
  address: string;

  @ApiProperty({ example: '+7 (495) 123-45-67', description: 'Телефон поликлиники' })
  phone: string;
}