import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository, UpdateResult } from 'typeorm';
import { CreateRoomQuestionAnswer, IRoomQuestionAnswerService } from './interfaces';
import { RoomQuestionAnswer } from './entities/room-question-answers.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class RoomQuestionAnswerService implements IRoomQuestionAnswerService {
  constructor(@InjectRepository(RoomQuestionAnswer) private readonly roomQuestionAnswerRepository: Repository<RoomQuestionAnswer>) {}

  async create({ isCorrect, player, roomQuestion, uuid }: CreateRoomQuestionAnswer): Promise<RoomQuestionAnswer> {
    return this.roomQuestionAnswerRepository.save({ isCorrect, player, roomQuestion, uuid });
  }

  update(options: FindConditions<RoomQuestionAnswer>, values: QueryDeepPartialEntity<RoomQuestionAnswer>): Promise<UpdateResult> {
    return this.roomQuestionAnswerRepository.update(options, values);
  }
}
