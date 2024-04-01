import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsPositive, IsString, MaxLength, ValidateNested } from 'class-validator';

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

  @ValidateNested()
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
