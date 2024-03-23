import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../questions/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { QuestionsModule } from '../questions/questions.module';
import { Services } from 'src/core/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer]), QuestionsModule],
  controllers: [AnswersController],
  providers: [
    {
      provide: Services.ANSWER,
      useClass: AnswersService,
    },
  ],
})
export class AnswersModule {}
