import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Services } from '../constants';
import { IUserService } from 'src/modules/users/interfaces/user';
import { UserAlreadyExists } from '../exceptions/user-already-exists';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(@Inject(Services.USERS) private userService: IUserService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any) {
    const user = await this.userService.findOneUser({
      email: request.body.email,
    });
    if (user) {
      throw new UserAlreadyExists();
    }
    return true;
  }
}
