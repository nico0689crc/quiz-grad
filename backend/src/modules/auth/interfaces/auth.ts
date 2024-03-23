import { Request } from 'express';
import { User } from 'src/core/entities';
import {
  ValidateUserAttributes,
  RegisterUserAttributes,
  VerifyEmailUserAttributes,
  RequestResetPasswordAttributes,
  ResetPasswordAttributes,
} from 'src/core/types/auth';
import { MessageEntityResponse } from 'src/core/types/common';

export interface IAuthService {
  validateUser(userCredentials: ValidateUserAttributes): Promise<User | null>;
  registerUser(registerUserAttributes: RegisterUserAttributes): Promise<MessageEntityResponse<User>>;
  statusUser(statusUserAttributes: Express.User): Promise<MessageEntityResponse<User>>;
  loginUser(loginUserAttributes: Express.User): Promise<MessageEntityResponse<User>>;
  verifyEmailUser(verifyEmailUserAttributes: VerifyEmailUserAttributes): Promise<MessageEntityResponse<User>>;
  requestResetPassword(requestResetPasswordAttributes: RequestResetPasswordAttributes): Promise<MessageEntityResponse<User>>;
  resetPassword(resetPasswordAttributes: ResetPasswordAttributes): Promise<MessageEntityResponse<User>>;
  createUserDemo(administratorUser: Express.User): Promise<MessageEntityResponse<User>>;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}
