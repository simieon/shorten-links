import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {keys} from "./config/keys";
import {ValidationPipe} from "@nestjs/common";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json())
  await app.listen(keys.port);
}
bootstrap();
