import { IsArray, ArrayMinSize, IsNumber } from 'class-validator';

/**
 * Data Transfer Object для запроса на массовое удаление.
 * Содержит массив идентификаторов сущностей для удаления.
 */
export class DeleteIdsDto {
  /**
   * @IsArray() - Проверяет, что поле является массивом.
   * @ArrayMinSize(1) - Массив не должен быть пустым (должен содержать хотя бы один id).
   * @IsNumber() - Каждый элемент массива должен быть числом.
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  ids: number[] = [];
}