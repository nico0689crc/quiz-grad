import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { IQuestionService } from './interfaces';
import { generateUUID } from 'src/core/helpers';
import { MessageEntityResponse } from 'src/core/types/common';
import { Quize } from '../quizes/entities/quize.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class QuestionsService implements IQuestionService {
  constructor(
    @InjectRepository(Quize) private readonly quizRepository: Repository<Quize>,
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>
  ) {}

  async create(createQuestionDto: CreateQuestionDto, user: Express.User): Promise<MessageEntityResponse<Question>> {
    const quiz = await this.quizRepository.findOne({
      where: {
        creator: user,
        uuid: createQuestionDto.quizUuid,
      },
    });

    if (!quiz) {
      throw new NotFoundException("The quiz to which you're trying to add this question does not exist.");
    }

    const questionResult = await this.questionRepository.save({
      ...createQuestionDto,
      uuid: generateUUID(),
      quiz,
      answers: createQuestionDto.answers?.map((answer) => ({
        ...answer,
        uuid: generateUUID(),
      })),
    });

    const question = await this.questionRepository.findOne({
      relations: ['answers'],
      where: {
        uuid: questionResult.uuid,
      },
    });

    return {
      message: 'Congratulations! Your question is now live, awaiting eager minds to embark on a delightful adventure of learning and fun!',
      statusCode: HttpStatus.CREATED,
      result: plainToClass(Question, question),
    };
  }

  async findOne(options: FindOneOptions<Question>): Promise<Question> {
    const question = await this.questionRepository.findOne(options);

    if (!question) {
      throw new NotFoundException("The question you're looking for couldn't be found.");
    }

    return question;
  }

  async update(
    uuid: string,
    updateQuestionDto: UpdateQuestionDto,
    user: Express.User & { uuid: string }
  ): Promise<MessageEntityResponse<void>> {
    const question = await this.questionRepository.findOne({
      where: { uuid },
      relations: ['quiz', 'quiz.creator'],
    });

    if (!question || question?.quiz?.creator?.uuid !== user.uuid) {
      throw new NotFoundException("The question you're looking to update couldn't be found.");
    }

    Object.keys(updateQuestionDto).forEach((key) => {
      if (['title', 'description', 'secondsToDeliverAnswer', 'typeAnswer'].includes(key)) {
        question[key] = updateQuestionDto[key];
      }
    });

    await this.questionRepository.save(question);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  async remove(uuid: string, user: Express.User & { uuid: string }): Promise<MessageEntityResponse<void>> {
    const question = await this.questionRepository.findOne({
      where: { uuid },
      relations: ['quiz', 'quiz.creator'],
    });

    if (!question || question?.quiz?.creator?.uuid !== user.uuid) {
      throw new NotFoundException("The question you're looking to remove couldn't be found.");
    }

    await this.questionRepository.remove(question);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
