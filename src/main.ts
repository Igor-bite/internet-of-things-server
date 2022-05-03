import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';
import { ResponseTimeInterceptor } from "./interceptors/timecalc.interceptor";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionStructureFilter } from "./filters/structure.exception.filter";
import { PrismaExceptionFilter } from "./filters/prisma.exception.filter";
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  }));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseTimeInterceptor());
  app.useGlobalFilters(new HttpExceptionStructureFilter(), new PrismaExceptionFilter());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  hbs.registerHelper('isdefined', function (value) {
    return value !== undefined;
  });
  hbs.registerHelper('isEqual', function (value1, value2) {
    return value1 === value2;
  });
  hbs.registerHelper('moreThan', function (value1, value2) {
    return value1 > value2;
  });
  hbs.registerHelper('lessThan', function (value1, value2) {
    return value1 < value2;
  });
  hbs.registerHelper('incremented', function (value) {
    return value + 1;
  });
  hbs.registerHelper('decremented', function (value) {
    return value - 1;
  });

  const config = new DocumentBuilder()
    .setTitle('IoT Server API')
    .setDescription('API for controlling your microcontrollers through internet')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();