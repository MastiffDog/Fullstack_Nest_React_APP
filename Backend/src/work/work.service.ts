import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { DeleteIdsDto } from './dto/delete-ids.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work) // Внедряем репозиторий для работы с сущностью Work
    private workRepository: Repository<Work>,
  ) {}

  async create(createWorkDto: CreateWorkDto): Promise<Work> {
    const newWork = this.workRepository.create(createWorkDto); // Создаем новый объект из DTO
    return await this.workRepository.save(newWork); // Сохраняем в БД и возвращаем результат
  }

  async findAll(): Promise<Work[]> {
    return await this.workRepository.find(); // Находим все записи в таблице Work
  }

  /**
   * Удаляет все записи из таблицы Work.
   * Используйте с осторожностью!
   */
  async deleteAll(): Promise<void> {
    await this.workRepository.clear(); // Метод clear() удаляет все строки из таблицы
  }

  /**
   * Удаляет конкретную запись по её ID.
   * @param id - Идентификатор записи для удаления
   */
  async remove(id: number): Promise<void> {
    const result = await this.workRepository.delete(id); // Возвращает количество затронутых строк
    if (result.affected === 0) {
      throw new NotFoundException(`Запись с ID ${id} не найдена.`);
    }
  }

  /**
   * Редактирует существующую запись.
   * @param id - Идентификатор записи для редактирования
   * @param updateData - Объект с новыми данными (DTO)
   */
  async update(id: number, updateData: Partial<CreateWorkDto>): Promise<Work> {
    // Сначала находим сущность в БД
    const workToUpdate = await this.findOne(id); 

    // Если сущность существует, обновляем её свойства данными из DTO
    Object.assign(workToUpdate, updateData);

    // Сохраняем изменения в базу данных
    return await this.workRepository.save(workToUpdate);
  }

  /**
   * Находит и возвращает одну запись по её ID.
   * @param id - Идентификатор искомой записи
   */
  // Альтернативный, более современный синтаксис:
  async findOne(id: number): Promise<Work> {
     const work = await this.workRepository.findOneOrFail({ where: { id } });
     return work; 
     // Метод findOneOrFail сам выбросит NotFoundException, если сущность не найдена.
  }


  async deleteMany(deleteIdsDto?: DeleteIdsDto): Promise<number> {
    console.log("from swagger:",deleteIdsDto);

    if (!deleteIdsDto?.ids) {
      throw new Error('Массив идентификаторов для удаления отсутствует.');
    }

    const deletedCount = await this.workRepository
      .createQueryBuilder('work')
      .where('work.id IN (:...ids)', { ids: deleteIdsDto.ids })
      .delete()
      .execute();

    // Используем опциональную последовательность и нулевое слияние.
    // Если deletedCount.affected будет null или undefined, вернется 0.
    return deletedCount.affected ?? 0; 
  }  
}