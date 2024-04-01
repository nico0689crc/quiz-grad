import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizeDto } from './dto/create-quize.dto';
import { UpdateQuizeDto } from './dto/update-quize.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quize } from 'src/modules/quizes/entities/quize.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { quizes } from 'src/core/constants/quizes';
import { IQuizService } from './interfaces';
import { generateUUID } from 'src/core/helpers';

@Injectable()
export class QuizesService implements IQuizService {
  constructor(@InjectRepository(Quize) private readonly quizRepository: Repository<Quize>) { }

  async create(createQuizeDto: CreateQuizeDto, user: Express.User): Promise<Quize> {
    const quizResult = await this.quizRepository.save({
      ...createQuizeDto,
      creator: user,
      uuid: generateUUID(),
      questions: createQuizeDto.questions?.map((question) => ({
        ...question,
        uuid: generateUUID(),
        answers: question.answers?.map((answer) => ({
          ...answer,
          uuid: generateUUID(),
        })),
      })),
    });

    return this.quizRepository.findOne({
      relations: ['questions', 'questions.answers'],
      where: {
        creator: user,
        uuid: quizResult.uuid,
      },
    });
  }

  async findAll(user: Express.User): Promise<Quize[]> {
    return await this.quizRepository.find({
      relations: ['questions', 'questions.answers'],
      where: {
        creator: user,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(options: FindOneOptions<Quize>): Promise<Quize> {
    return this.quizRepository.findOne(options);
  }

  async update(uuid: string, updateQuizeDto: UpdateQuizeDto, user: Express.User): Promise<void> {
    const quiz = await this.quizRepository.findOne({
      where: { uuid, creator: user },
    });

    if (!quiz) {
      throw new NotFoundException("The quiz you're looking to update couldn't be found.");
    }

    Object.keys(updateQuizeDto).forEach((key) => {
      if (['title', 'description', 'maxPlayerAmount'].includes(key)) {
        quiz[key] = updateQuizeDto[key];
      }
    });

    await this.quizRepository.save(quiz);
  }

  async remove(uuid: string, user: Express.User): Promise<void> {
    const quiz = await this.quizRepository.findOne({
      where: { uuid, creator: user },
    });

    if (!quiz) {
      throw new NotFoundException("The quiz you're looking to remove couldn't be found.");
    }

    await this.quizRepository.remove(quiz);
  }

  async runSeeds(user: Express.User): Promise<void> {
    try {
      const promisesQuiz = quizes.map((quiz) =>
        this.quizRepository.save({
          uuid: generateUUID(),
          title: quiz.title,
          description: quiz.description,
          maxPlayerAmount: quiz.numberOfPlayers,
          creator: user,
          questions: quiz.questions.map((question, index) => ({
            uuid: generateUUID(),
            title: question.title,
            description: question.description,
            secondsToDeliverAnswer: question.secondsToDeliverAnswer,
            typeAnswer: question.typeAnswer,
            order: ++index,
            answers: question.answers.map((answer, index) => ({
              content: answer.content,
              uuid: generateUUID(),
              isCorrect: answer.isCorrect,
              order: ++index,
            })),
          })),
        })
      );

      await Promise.all([...promisesQuiz]);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
