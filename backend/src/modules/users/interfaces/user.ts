import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserAttributes, FindOneUserParams } from 'src/core/types/users';

export interface IUserService {
  createUser(createUserAttributes: CreateUserAttributes): Promise<User>;
  findOneUser(findOneUserParam: FindOneUserParams): Promise<User>;
  saveUser(user: Partial<User>): Promise<User>;
}
