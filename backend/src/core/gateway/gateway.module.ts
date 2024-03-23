import { Module } from '@nestjs/common';
import { QuizGateway } from './gateway';
import { RoomsModule } from 'src/modules/rooms/rooms.module';
import { PlayersModule } from 'src/modules/players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player, Question, Quize, Room } from 'src/core/entities';
import { QuizesModule } from 'src/modules/quizes/quizes.module';
import { Services } from '../constants';
import { RoomsService } from 'src/modules/rooms/rooms.service';
import { QuizesService } from 'src/modules/quizes/quizes.service';
import { GatewayService } from './gateway.service';
import { PlayersService } from 'src/modules/players/players.service';
import { RoomQuestionModule } from 'src/modules/room-questions/room-questions.module';
import { RoomQuestionService } from 'src/modules/room-questions/room-questions.service';
import { RoomQuestion } from 'src/modules/room-questions/entities/room-questions.entity';
import { RoomQuestionAnswer } from 'src/modules/room-question-answers/entities/room-question-answers.entity';
import { RoomQuestionAnswerModule } from 'src/modules/room-question-answers/room-question-answers.module';
import { QuestionsService } from 'src/modules/questions/questions.service';
import { RoomQuestionAnswerService } from 'src/modules/room-question-answers/room-question-answers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomQuestion, Room, Player, Quize, RoomQuestionAnswer, Question]),
    RoomQuestionAnswerModule,
    RoomsModule,
    PlayersModule,
    QuizesModule,
    RoomQuestionModule,
  ],
  providers: [
    {
      provide: Services.QUESTION,
      useClass: QuestionsService,
    },
    {
      provide: Services.ROOM_QUESTION,
      useClass: RoomQuestionService,
    },
    {
      provide: Services.ROOM_QUESTION_ANSWER,
      useClass: RoomQuestionAnswerService,
    },
    {
      provide: Services.ROOM,
      useClass: RoomsService,
    },
    {
      provide: Services.QUIZ,
      useClass: QuizesService,
    },
    {
      provide: Services.PLAYER,
      useClass: PlayersService,
    },
    {
      provide: Services.GATEWAY,
      useClass: GatewayService,
    },
    QuizGateway,
  ],
})
export class GatewayModule {}
