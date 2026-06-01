import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { Work } from './work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work])], // Регистрируем сущность Tag для этого модуля
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}