import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { ICreateParams, IPlayerService } from './interfaces';
import { Player } from './entities/players.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { generateUUID } from 'src/core/helpers';
import { faker } from '@faker-js/faker';

@Injectable()
export class PlayersService implements IPlayerService {
  constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>) {}
  create({ room, socketId, userName, playerType }: ICreateParams): Promise<Player> {
    return this.playerRepository.save({ uuid: generateUUID(), room, socketId, userName, playerType, avatar: faker.image.avatar() });
  }
  update(options: FindConditions<Player>, values: QueryDeepPartialEntity<Player>): Promise<UpdateResult> {
    return this.playerRepository.update(options, values);
  }
  findOne(options: FindOneOptions<Player>): Promise<Player> {
    return this.playerRepository.findOne(options);
  }
  findAll(options: FindManyOptions<Player>): Promise<Player[]> {
    return this.playerRepository.find(options);
  }
}
