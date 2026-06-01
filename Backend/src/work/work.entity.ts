import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Work {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  executor!: string;

  @Column({ length: 50 })
  dimension_type!: string;

  @Column('float') 
  dimension_value!: number;

  @Column({ length: 100 })
  work!: string;

  @Column({ length: 20 })
  date!: string;
}