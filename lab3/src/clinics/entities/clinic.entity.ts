import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('clinics')
export class Clinic {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Городская поликлиника №1', description: 'Название поликлиники' })
  @Column()
  name: string;

  @ApiProperty({ example: 'ул. Ленина, 10', description: 'Адрес поликлиники' })
  @Column()
  address: string;

  @ApiProperty({ example: '+7 (495) 123-45-67', description: 'Телефон поликлиники' })
  @Column()
  phone: string;

  @ApiProperty({ 
    type: () => Doctor,
    isArray: true,
    description: 'Врачи поликлиники' 
  })
  @OneToMany(() => Doctor, (doctor) => doctor.clinic)
  doctors: Doctor[];
}