import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //check validate
      forbidNonWhitelisted: true, //check ko ton tai
    }),
  );
  app.setGlobalPrefix('api/v1', { exclude: [''] })
  await app.listen(8081);
}
bootstrap();
