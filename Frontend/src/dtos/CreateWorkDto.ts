// src/dtos/CreateWorkDto.ts
export interface CreateWorkDto {
  executor: string;
  dimension_type: string;
  dimension_value: number;
  work: string;
  date: string; // Формат строки даты, например 'YYYY-MM-DD'
}