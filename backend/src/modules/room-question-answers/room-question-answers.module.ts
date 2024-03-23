import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/core/constants';
import { RoomQuestionAnswer } from './entities/room-question-answers.entity';
import { RoomQuestionAnswerService } from './room-question-answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomQuestionAnswer])],
  providers: [
    {
      provide: Services.ROOM_QUESTION,
      useClass: RoomQuestionAnswerService,
    },
  ],
})
export class RoomQuestionAnswerModule {}
