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
  app.enableCors({
    origin: 'http://localhost:3000', // Cho phép origin này
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Cho phép các phương thức này
    credentials: true, // Nếu bạn cần gửi cookie hoặc header xác thực
  });
  await app.listen(8081);
}
bootstrap();
