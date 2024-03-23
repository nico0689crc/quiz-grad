import { Quize } from 'src/modules/quizes/entities/quize.entity';
import { Room } from '../entities/room.entity';
import { FindOneOptions, UpdateResult, FindManyOptions, DeleteResult, FindConditions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Player } from 'src/core/gateway/types';

export interface IRoomService {
  findOne(options: FindOneOptions<Room>): Promise<Room>;
  findAll(options: FindManyOptions<Room>): Promise<Room[]>;
  findAllPlayers(options: FindOneOptions<Room>): Promise<Player[]>;
  create(quiz: Quize): Promise<Room>;
  update(options: FindConditions<Room>, values: QueryDeepPartialEntity<Room>): Promise<UpdateResult>;
  delete(options: FindConditions<Room>): Promise<DeleteResult>;
}
