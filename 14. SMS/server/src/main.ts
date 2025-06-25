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
    .setTitle('University API')
    .setDescription(
      `
# University Management System API

A comprehensive REST API for managing university operations including student enrollment, course management, faculty administration, and user authentication with role-based access control.

## 🏫 Core Features

This API provides endpoints for managing:

- **👥 Student Management** - Student records, enrollment, and academic tracking
- **📚 Course Management** - Course creation, scheduling, and assignments  
- **👨‍🏫 Faculty & Lecturer Profiles** - Staff management and course assignments
- **🏢 Department Administration** - Organizational structure management
- **🔐 Authentication & Authorization** - Secure user management with RBAC

## 🔐 Authentication

This API uses **JWT Bearer tokens** for secure authentication. All protected endpoints require proper authorization.

### Getting Started:

1. **Login** using the \`POST /auth/signin\` endpoint
2. **Include the token** in your requests:   \`\`\`   Authorization: Bearer <your-access-token>   \`\`\`
3. **Refresh tokens** when needed using \`GET /auth/refresh\`

## 👥 Roles & Permissions

| Role | Permissions | Access Level |
|------|-------------|--------------|
| **🔴 ADMIN** | Full system access | Create, Read, Update, Delete all resources |
| **🟡 FACULTY** | Academic management | Manage students, courses, view most data |
| **🟢 STUDENT** | Limited access | View own data and course information |
| **⚪ GUEST** | Public access only | View public information |

## 📖 API Usage

- **Base URL**: \`http://localhost:8000/api/v1\`
- **Documentation**: Available at \`/docs\`
- **Content-Type**: \`application/json\`
- **Authentication**: Bearer token in Authorization header
    `,
    )
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints') // Add tags for grouping
    .addTag('students', 'Student management')
    .addTag('courses', 'Course management')
    .addTag('profiles', 'Profile management')
    .addTag('departments', 'Department management')
    .addTag('lecturer', 'Lecturer management')
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
