import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全てのドメインから許可するCORSの設定
  app.enableCors();

  // 一部のドメインからGETとPOSTだけ許可するCORSの設定
  // app.enableCors({
  //   origin: ['http://example.com:1234'],
  //   methods: ['GET', 'POST']
  // });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(env.PORT);
}
bootstrap();
