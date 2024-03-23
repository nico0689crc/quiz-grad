import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Services } from 'src/core/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quize } from '../quizes/entities/quize.entity';
import { Question } from './entities/question.entity';
import { QuizesModule } from '../quizes/quizes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quize, Question]), QuizesModule],
  controllers: [QuestionsController],
  providers: [
    {
      provide: Services.QUESTION,
      useClass: QuestionsService,
    },
  ],
})
export class QuestionsModule {}
