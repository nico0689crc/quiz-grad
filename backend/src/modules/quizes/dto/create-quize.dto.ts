import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsPositive, IsString, MaxLength, ValidateNested } from 'class-validator';
import { TypeAnswer } from 'src/modules/questions/entities/question.entity';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  secondsToDeliverAnswer: number;

  @IsEnum(TypeAnswer)
  typeAnswer: TypeAnswer;

  @ValidateNested({})
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}

export class CreateQuizeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  maxPlayerAmount: number;

  @ValidateNested()
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
