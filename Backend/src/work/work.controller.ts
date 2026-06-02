import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,Query
} from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { DeleteIdsDto } from './dto/delete-ids.dto';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  /**
   * GET /works - Получить список всех работ
   */
  @Get()
  async findAll(): Promise<any> {
    return this.workService.findAll();
  }

  /**
   * POST /works - Создать новую работу
   * @param createWorkDto - Данные для создания, полученные из тела запроса
   */
  @Post()
  async create(@Body() createWorkDto: CreateWorkDto): Promise<any> {
    return this.workService.create(createWorkDto);
  }

  /**
   * GET /works/:id - Найти работу по ID
   * @param id - Идентификатор работы, полученный из URL
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.workService.findOne(id);
  }

  /**
   * PUT /works/:id - Обновить существующую работу
   * @param id - Идентификатор работы для обновления
   * @param updateData - Новые данные для работы
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateWorkDto>, // Используем Partial для частичного обновления
  ): Promise<any> {
    return this.workService.update(id, updateData);
  }

  /**
   * DELETE /works/:id - Удалить конкретную работу
   * @param id - Идентификатор работы для удаления
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.workService.remove(id);
  }

  /**
   * DELETE /works - Удалить ВСЕ работы (опасная операция!)
   */
  @Delete()
  async deleteAll(): Promise<void> {
    await this.workService.deleteAll();
  }

  /**
   * DELETE /works/delete-many - Удалить несколько работ по списку ID.
   * @param deleteIdsDto - Объект, содержащий массив идентификаторов для удаления.
   */
  @Post('delete-many')
  async removeMany(@Body() deleteIdsDto: DeleteIdsDto) { 
    const count = await this.workService.deleteMany(deleteIdsDto);
    return { message: 'Успешно удалено', deletedCount: count };
  }
}