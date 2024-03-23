import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('A user with the provided credentials was not found.', HttpStatus.NOT_FOUND);
  }
}
