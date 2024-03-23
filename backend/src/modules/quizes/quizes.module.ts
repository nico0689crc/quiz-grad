import { Module } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { QuizesController } from './quizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quize } from './entities/quize.entity';
import { Services } from 'src/core/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Quize])],
  controllers: [QuizesController],
  providers: [
    {
      provide: Services.QUIZ,
      useClass: QuizesService,
    },
  ],
})
export class QuizesModule {}
