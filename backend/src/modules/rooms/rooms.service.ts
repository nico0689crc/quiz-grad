import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, FindConditions, FindManyOptions, UpdateResult, DeleteResult } from 'typeorm';
import { IRoomService } from './interfaces';
import { Room } from './entities/room.entity';
import { Quize } from 'src/modules/quizes/entities/quize.entity';
import { generateUUID } from 'src/core/helpers';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Player } from 'src/core/gateway/types';
import { faker } from '@faker-js/faker';

@Injectable()
export class RoomsService implements IRoomService {
  constructor(@InjectRepository(Room) private readonly roomRepository: Repository<Room>) {}
  create(quiz: Quize): Promise<Room> {
    return this.roomRepository.save({ uuid: generateUUID(), quiz, inviteCode: faker.string.numeric(6) });
  }

  findOne(options: FindOneOptions<Room>): Promise<Room> {
    return this.roomRepository.findOne(options);
  }

  findAll(options: FindManyOptions<Room>): Promise<Room[]> {
    return this.roomRepository.find(options);
  }

  update(options: FindConditions<Room>, values: QueryDeepPartialEntity<Room>): Promise<UpdateResult> {
    return this.roomRepository.update(options, values);
  }

  delete(options: FindConditions<Room>): Promise<DeleteResult> {
    return this.roomRepository.delete(options);
  }

  async findAllPlayers(options: FindOneOptions<Room>): Promise<Player[]> {
    const room = await this.roomRepository.findOne({ ...options, relations: ['players'] });
    return (
      room?.players?.map(({ userName, uuid, connected, playerType, avatar }) => ({
        userName,
        playerUUID: uuid,
        connected,
        playerType,
        avatar,
      })) ?? []
    );
  }
}
