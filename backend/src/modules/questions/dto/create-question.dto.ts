import { IsNotEmpty, IsString } from 'class-validator';
import { CreateQuestionDto as CreateQuestionDtoFromQuiz } from 'src/modules/quizes/dto/create-quize.dto';

export class CreateQuestionDto extends CreateQuestionDtoFromQuiz {
  @IsString()
  @IsNotEmpty()
  quizUuid: string;
}
