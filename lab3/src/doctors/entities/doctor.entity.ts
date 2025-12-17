import { ApiProperty } from '@nestjs/swagger';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('doctors')
export class Doctor {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО врача' })
  @Column()
  fullName: string;

  @ApiProperty({ example: 'Терапевт', description: 'Специализация врача' })
  @Column()
  specialization: string;


  @ApiProperty({ 
    type: () => Clinic,  
    description: 'Поликлиника врача' 
  })
  @ManyToOne(() => Clinic, (clinic) => clinic.doctors)
  clinic: Clinic;

  @ApiProperty({ 
    type: () => Patient,
    isArray: true,
    description: 'Пациенты врача' 
  })
  @OneToMany(() => Patient, (patient) => patient.doctor)
  patients: Patient[];
}