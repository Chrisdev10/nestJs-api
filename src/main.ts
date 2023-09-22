import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { swaggerConfiguration } from '@common/documentation/swagger.configuration';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  swaggerConfiguration.config(app);
  await app.listen(3000);
}
bootstrap();
