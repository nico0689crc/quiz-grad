import { MessageEntityResponse } from 'src/core/types/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question } from 'src/modules/questions/entities/question.entity';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { FindOneOptions } from 'typeorm';

export interface IQuestionService {
  create(createQuestionDto: CreateQuestionDto, user: Express.User): Promise<MessageEntityResponse<Question>>;
  findOne(options: FindOneOptions<Question>): Promise<Question>;
  update(uuid: string, updateQuestionDto: UpdateQuestionDto, user: Express.User): Promise<MessageEntityResponse<void>>;
  remove(uuid: string, user: Express.User): Promise<MessageEntityResponse<void>>;
}
