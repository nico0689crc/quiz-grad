import { MessageEntityResponse } from 'src/core/types/common';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Answer } from '../entities/answer.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export interface IAnswerService {
  findOne(options: FindOneOptions<Answer>): Promise<Answer>;
  findAll(options: FindManyOptions<Answer>): Promise<Answer[]>;
  create(createAnswerDto: CreateAnswerDto, user: Express.User): Promise<MessageEntityResponse<Answer>>;
  update(uuid: string, updateAnswerDto: UpdateAnswerDto, user: Express.User): Promise<MessageEntityResponse<void>>;
  remove(uuid: string, user: Express.User): Promise<MessageEntityResponse<void>>;
}
