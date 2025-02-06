import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { writeFileSync } from 'fs';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: 400,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Pet API')
    .setDescription('Create a cat or dog record and view pets by id')
    .setVersion('1.0')
    .addTag('Pets', 'Pets operations', {
      url: 'https://example.com/api',
      description: 'Operations API endpoint',
    })
    .addTag('cats')
    .addTag('dogs')
    .setContact(
      'Speakeasy support',
      'http://www.example.com/support',
      'support@example.com',
    )
    .setTermsOfService('http://example.com/terms/')
    .setLicense(
      'Apache 2.0',
      'https://www.apache.org/licenses/LICENSE-2.0.html',
    )
    .addServer('http://localhost:3000/', 'Development server')
    .addExtension('x-speakeasy-retries', {
      strategy: 'backoff',
      backoff: {
        initialInterval: 500,
        maxInterval: 60000,
        maxElapsedTime: 3600000,
        exponent: 1.5,
      },
      statusCodes: ['5XX'],
      retryConnectionErrors: true,
    })
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options); // serializable object - conform to OpenAPI

  // Convert the document to YAML format
  const yamlString = yaml.dump(document);
  // Save the YAML document to a file
  writeFileSync('openapi.yaml', yamlString);

  SwaggerModule.setup('api', app, document, {
    swaggerUiEnabled: false,
  });

  app.use(
    '/api',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173', // Vite's default port
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
