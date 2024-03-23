import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { IRoomQuestionService } from './interfaces';
import { RoomQuestion, RoomQuestionStatus } from './entities/room-questions.entity';
import { Room } from '../rooms/entities/room.entity';
import { Question } from '../questions/entities/question.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class RoomQuestionService implements IRoomQuestionService {
  constructor(@InjectRepository(RoomQuestion) private readonly roomQuestionRepository: Repository<RoomQuestion>) {}

  async create({
    room,
    question,
    status,
    uuid,
  }: {
    room: Room;
    question: Question;
    status: RoomQuestionStatus;
    uuid: string;
  }): Promise<RoomQuestion> {
    return this.roomQuestionRepository.save({ room, question, status, uuid });
  }

  async findOne(options: FindOneOptions<RoomQuestion>): Promise<RoomQuestion> {
    return this.roomQuestionRepository.findOne(options);
  }

  async update(options: FindConditions<RoomQuestion>, values: QueryDeepPartialEntity<RoomQuestion>) {
    return this.roomQuestionRepository.update(options, values);
  }
}
