import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeormStore } from 'connect-typeorm/out';
import { Session } from './modules/sessions/session.entity';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';
import { validationExceptionFactory } from './core/exceptions/validation-exception-factory';

async function bootstrap() {
  const { BACKEND_CONTAINER_PORT, COOKIE_SECRET, FRONTEND_HOST_DOMAIN } = process.env;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionRepository = getRepository(Session);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: [FRONTEND_HOST_DOMAIN], credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    })
  );
  app.set('trust proxy', 'loopback');
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'QUIZ_GRAD_APP_SESSION_ID',
      cookie: {
        maxAge: 86400000,
      },
      store: new TypeormStore().connect(sessionRepository),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.listen(BACKEND_CONTAINER_PORT, () => console.log(`Running on Port ${BACKEND_CONTAINER_PORT}`)).catch((error) => console.log(error));
}
bootstrap();
