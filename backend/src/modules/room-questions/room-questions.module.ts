import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/core/constants';
import { RoomQuestion } from './entities/room-questions.entity';
import { RoomQuestionService } from './room-questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomQuestion])],
  providers: [
    {
      provide: Services.ROOM_QUESTION,
      useClass: RoomQuestionService,
    },
  ],
})
export class RoomQuestionModule {}
