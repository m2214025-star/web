import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('patients')
export class Patient {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Смирнов Михаил Александрович', description: 'ФИО пациента' })
  @Column()
  fullName: string;

  @ApiProperty({ example: '1990-05-15', description: 'Дата рождения' })
  @Column()
  birthDate: string;

  @ApiProperty({ example: '+7 (916) 123-45-67', description: 'Телефон пациента' })
  @Column()
  phone: string;

  @ApiProperty({ 
    type: () => Doctor,  
    description: 'Лечащий врач' 
  })
  @ManyToOne(() => Doctor, (doctor) => doctor.patients)
  doctor: Doctor;
}