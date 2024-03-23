import { FindConditions, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';
import { Player, PlayerType } from '../entities/players.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Room } from 'src/core/entities';

export interface ICreateParams {
  userName: string;
  socketId: string;
  room: Room;
  playerType: PlayerType;
}

export interface IPlayerService {
  findOne(options: FindOneOptions<Player>): Promise<Player>;
  findAll(options: FindManyOptions<Player>): Promise<Player[]>;
  update(options: FindConditions<Player>, values: QueryDeepPartialEntity<Player>): Promise<UpdateResult>;
  create(params: ICreateParams): Promise<Player>;
}
