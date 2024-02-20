/**
 * @file: main.ts
 * @description: This file is the entry point of the application. It is responsible for bootstrapping the application and setting up the Swagger documentation. It also listens on port 3000 for incoming requests. The application is built using the NestJS framework. The main.ts file is the entry point of the application, and it is responsible for bootstrapping the application and setting up the Swagger documentation. It also listens on port 3000 for incoming requests. The application is built using the NestJS framework. The main.ts file is the entry point of the application, and it is responsible for bootstrapping the application and setting up the Swagger documentation. It also listens on port 3000 for incoming requests. The application is built using the NestJS framework.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './custom-exception.filter';

async function bootstrap() {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Set up the Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('35Inch Software Rest API Case Study')
    .setDescription('You can find the endpoints of the application here.')
    .setVersion('1.0')
    .build();

  // Enable CORS
  app.enableCors();

  // Set up the global exception filter
  app.useGlobalFilters(new CustomExceptionFilter());

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);
  // Set up the Swagger UI
  SwaggerModule.setup('api', app, document);

  // Listen on port 3000
  await app.listen(3000);
}
// Bootstrap the application
bootstrap();
