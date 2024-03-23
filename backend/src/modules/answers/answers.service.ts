import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { IAnswerService } from './interfaces';
import { Question, TypeAnswer } from '../questions/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { MessageEntityResponse } from 'src/core/types/common';
import { generateUUID } from 'src/core/helpers';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AnswersService implements IAnswerService {
  constructor(
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>
  ) {}

  findOne(options: FindOneOptions<Answer>): Promise<Answer> {
    return this.answerRepository.findOne(options);
  }

  findAll(options: FindManyOptions<Answer>): Promise<Answer[]> {
    return this.answerRepository.find(options);
  }

  async create(createAnswerDto: CreateAnswerDto, user: Express.User & { uuid: string }): Promise<MessageEntityResponse<Answer>> {
    const question = await this.questionRepository.findOne({
      where: {
        uuid: createAnswerDto.questionUuid,
      },
      relations: ['quiz', 'quiz.creator'],
    });

    if (!question || question?.quiz?.creator?.uuid !== user.uuid) {
      throw new NotFoundException("The question to which you're trying to add this answer does not exist.");
    }

    const answerResult = await this.answerRepository.save({
      ...createAnswerDto,
      uuid: generateUUID(),
      question,
    });

    const answer = await this.answerRepository.findOne({
      relations: ['question', 'question.answers'],
      where: {
        uuid: answerResult.uuid,
      },
    });

    if (
      answer?.question?.answers?.filter((answer) => answer.isCorrect).length > 1 &&
      answer?.question?.typeAnswer === TypeAnswer.SINGLE_ANSWER
    ) {
      question.typeAnswer = TypeAnswer.MULTIPLE_ANSWERS;
      this.questionRepository.save(question);
    }

    return {
      message: 'Congratulations! Your answer is now live, awaiting eager minds to embark on a delightful adventure of learning and fun!',
      statusCode: HttpStatus.CREATED,
      result: plainToClass(Answer, { uuid: answer.uuid, content: answer.content, isCorrect: answer.isCorrect }),
    };
  }

  async update(
    uuid: string,
    updateAnswerDto: UpdateAnswerDto,
    user: Express.User & { uuid: string }
  ): Promise<MessageEntityResponse<void>> {
    const answer = await this.answerRepository.findOne({
      where: {
        uuid,
      },
      relations: ['question', 'question.quiz', 'question.quiz.creator'],
    });

    if (!answer || answer?.question?.quiz?.creator?.uuid !== user.uuid) {
      throw new NotFoundException("The answer you're looking to update couldn't be found.");
    }

    Object.keys(updateAnswerDto).forEach((key) => {
      if (['content', 'isCorrect'].includes(key)) {
        answer[key] = updateAnswerDto[key];
      }
    });

    await this.answerRepository.save(answer);

    const answerResult = await this.answerRepository.findOne({
      relations: ['question', 'question.answers'],
      where: {
        uuid,
      },
    });

    if (
      answerResult?.question?.answers?.filter((answer) => answer.isCorrect).length > 1 &&
      answerResult?.question?.typeAnswer === TypeAnswer.SINGLE_ANSWER
    ) {
      answerResult.question.typeAnswer = TypeAnswer.MULTIPLE_ANSWERS;
      this.questionRepository.save(answerResult.question);
    }

    if (
      answerResult?.question?.answers?.filter((answer) => answer.isCorrect).length <= 1 &&
      answerResult?.question?.typeAnswer === TypeAnswer.MULTIPLE_ANSWERS
    ) {
      answerResult.question.typeAnswer = TypeAnswer.SINGLE_ANSWER;
      this.questionRepository.save(answerResult.question);
    }

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  async remove(uuid: string, user: Express.User & { uuid: string }): Promise<MessageEntityResponse<void>> {
    const answer = await this.answerRepository.findOne({
      where: {
        uuid,
      },
      relations: ['question', 'question.quiz', 'question.quiz.creator'],
    });

    if (!answer || answer?.question?.quiz?.creator?.uuid !== user.uuid) {
      throw new NotFoundException("The answer you're looking to remove couldn't be found.");
    }

    await this.answerRepository.remove(answer);

    const question = await this.questionRepository.findOne({
      relations: ['answers'],
      where: {
        uuid: answer.question.uuid,
      },
    });

    if (question?.answers?.filter((answer) => answer.isCorrect).length <= 1 && question?.typeAnswer === TypeAnswer.MULTIPLE_ANSWERS) {
      question.typeAnswer = TypeAnswer.SINGLE_ANSWER;
      this.questionRepository.save(question);
    }

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
