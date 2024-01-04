import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {keys} from "./config/keys";
import {ValidationPipe} from "@nestjs/common";
import * as morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(morgan('tiny'));
  await app.listen(keys.port);
}
bootstrap();
