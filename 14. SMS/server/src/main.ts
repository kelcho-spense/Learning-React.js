import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './http-exception.filter';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Helmet for security
  app.use(helmet());
  // Enable CORS
  app.enableCors({
    origin: '*', // Adjust this to your needs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  // Register the global exception filter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // API versioning
  app.setGlobalPrefix('api/v1');

  // Swagger Documentation Configuration
  const config = new DocumentBuilder()
    .setTitle('Blogs API')
    .setDescription(
      `
# Blogs API
A comprehensive REST API for managing blogs.
    `,
    )
    .setVersion('1.0')
    // .addTag('auth', 'Authentication endpoints') // Add tags for grouping
    // .addTag('students', 'Student management')
    // .addTag('courses', 'Course management')
    // .addTag('profiles', 'Profile management')
    // .addTag('departments', 'Department management')
    // .addTag('lecturer', 'Lecturer management')
    .addBearerAuth()
    .addServer('http://localhost:8000', 'Local Development Server') // Add server URL
    .addServer('https://api.example.com', 'Production Server') // Add production server URL
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none', // Collapse all sections by default
      filter: true, // Enable search filter
      showRequestDuration: true, // Show request duration
      tryItOutEnabled: true, // Enable "Try it out" button
    },
    customCss: `
    .swagger-ui .topbar { display: none; }    /* Hide Swagger logo */
    .swagger-ui .info { margin-bottom: 20px; }
  `,
    customSiteTitle: 'University API Documentation',
  });

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');

  await app.listen(PORT);
}
bootstrap();
