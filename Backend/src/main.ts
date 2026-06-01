import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Swagger UI Config
  const config = new DocumentBuilder()
    .setTitle('Work API')
    .setDescription('API for managing works')
    .setVersion('1.0')
    .addTag('works')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();