import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAnswerDto as CreateAnswerDtoFromQuiz } from 'src/modules/quizes/dto/create-quize.dto';

export class CreateAnswerDto extends CreateAnswerDtoFromQuiz {
  @IsString()
  @IsNotEmpty()
  questionUuid: string;
}
