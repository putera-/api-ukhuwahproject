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
  await appSerivce.createPath('./uploads')
  await appSerivce.createPath('./uploads/photos')

  await app.listen(process.env.PORT);
}
bootstrap();
