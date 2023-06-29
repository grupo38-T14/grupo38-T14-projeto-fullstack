import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );

  app.enableCors({
    origin: true,
  });

  const config = new DocumentBuilder()
  .setTitle("Motors Shop")
  .setDescription("")
  .setVersion("1.0")
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document)

  await app.listen(8000);
}
bootstrap();
