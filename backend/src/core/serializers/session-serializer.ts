/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from '../constants';
import { IUserService } from 'src/modules/users/interfaces/user';
import { User } from '../entities';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService
  ) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findOneUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
