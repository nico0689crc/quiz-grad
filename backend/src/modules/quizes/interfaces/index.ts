import { CreateQuizeDto } from '../dto/create-quize.dto';
import { Quize } from 'src/modules/quizes/entities/quize.entity';
import { UpdateQuizeDto } from '../dto/update-quize.dto';
import { FindOneOptions } from 'typeorm';

export interface IQuizService {
  create(createQuizeDto: CreateQuizeDto, user: Express.User): Promise<Quize>;
  findAll(user: Express.User): Promise<Quize[]>;
  findOne(options: FindOneOptions<Quize>): Promise<Quize>;
  update(uuid: string, updateQuizeDto: UpdateQuizeDto, user: Express.User): Promise<void>;
  remove(uuid: string, user: Express.User): Promise<void>;
  runSeeds(user: Express.User): Promise<void>;
}
