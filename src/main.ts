import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('Movies App')
    .setDescription('The movies API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: true,
  });

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on:
     \n http://localhost:${port}/${globalPrefix}
     \n🚀 Docs http://localhost:${port}/docs
    `,
  );
}
bootstrap();
