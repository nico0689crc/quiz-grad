import { Question, Room, RoomQuestion } from 'src/core/entities';
import { RoomQuestionStatus } from '../entities/room-questions.entity';
import { FindConditions, FindOneOptions, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IRoomQuestionService {
  create(payload: { room: Room; question: Question; status: RoomQuestionStatus; uuid: string }): Promise<RoomQuestion>;
  findOne(options: FindOneOptions<RoomQuestion>): Promise<RoomQuestion>;
  update(options: FindConditions<RoomQuestion>, values: QueryDeepPartialEntity<RoomQuestion>): Promise<UpdateResult>;
}
