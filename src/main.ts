import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  const appSerivce = app.get(AppService);
  await appSerivce.createPath('./public')
  await appSerivce.createPath('./public/photos')
  await appSerivce.createPath('./public/avatar')

  // CORS
  app.enableCors({
    origin: ['https://stag.ukhuwahproject.com', 'https://ukhuwahproject.com', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  });

  const port = process.env.PORT;
  await app.listen(port);
  console.log(`App is listening at http://localhost:${port}`);
}
bootstrap();
