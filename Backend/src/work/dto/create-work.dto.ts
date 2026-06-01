import { IsString, IsNotEmpty, IsNumber, IsDateString, Length } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  executor!: string;

  @IsString()
  @IsNotEmpty()
  dimension_type!: string;

  @IsNumber()
  @IsNotEmpty() 
  dimension_value!: number;

  @IsString()
  @IsNotEmpty()
  work!: string;

  @IsDateString() 
  @IsNotEmpty()
  date!: string;
}