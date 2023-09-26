import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { swaggerConfiguration } from '@common/documentation/swagger.configuration';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '@common/api/exception/validation.exception';
import { ApiInterceptor } from '@common/interceptors/api.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ApiInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new ValidationException(validationErrors),
    }),
  );
  swaggerConfiguration.config(app);
  await app.listen(3000);
}
bootstrap();
