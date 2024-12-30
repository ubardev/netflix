import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['verbose'] });
  // app.setGlobalPrefix('v1');
  app.enableVersioning({
    type: VersioningType.URI,
    // defaultVersion: ['1', '2'],
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // Type 기반으로 자동으로 변환해줌
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Test API')
    .setDescription('Test API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(8002);
}
bootstrap();
