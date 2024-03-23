import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './core/email/email.module';
import { QuizesModule } from './modules/quizes/quizes.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';

import entities from './core/entities';
import { GatewayModule } from './core/gateway/gateway.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { PlayersModule } from './modules/players/players.module';
import { RoomQuestionModule } from './modules/room-questions/room-questions.module';
import { RoomQuestionAnswerModule } from './modules/room-question-answers/room-question-answers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: true,
      entities,
      logging: false,
    }),
    EmailModule,
    UsersModule,
    AuthModule,
    QuizesModule,
    QuestionsModule,
    AnswersModule,
    RoomsModule,
    RoomQuestionModule,
    RoomQuestionAnswerModule,
    PlayersModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
