import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { IUserService } from 'src/modules/users/interfaces/user';

import { CreateUserAttributes, FindOneUserParams } from 'src/core/types/users';

import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async createUser(createUserAttributes: CreateUserAttributes): Promise<User> {
    return this.userRepository.create(createUserAttributes);
  }

  async findOneUser(params: FindOneUserParams): Promise<User> {
    return this.userRepository.findOne(params);
  }

  async saveUser(user: Partial<User>) {
    return this.userRepository.save(user);
  }
}
