import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { User } from 'src/core/entities';
import { Services } from 'src/core/constants';
import { MessageEntityResponse } from 'src/core/types/common';
import {
  RegisterUserAttributes,
  RequestResetPasswordAttributes,
  ResetPasswordAttributes,
  ValidateUserAttributes,
  VerifyEmailUserAttributes,
} from 'src/core/types/auth';
import { compareHash, generateStringNumeric, generateToken, generateUUID, hash } from 'src/core/helpers';
import { UserNotFoundException } from 'src/core/exceptions/user-not-found';
import { EmailService } from 'src/core/email/email.service';

import { IAuthService } from './interfaces/auth';
import { IUserService } from 'src/modules/users/interfaces/user';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    private readonly emailService: EmailService
  ) {}

  async createUserDemo(): Promise<MessageEntityResponse<User>> {
    // if (administratorUser.email !== process.env.EMAIL_ADMINISTRATOR) {
    //   throw new UnauthorizedException('User not allowed to perform this action.');
    // }

    const password = await hash(process.env.PASSWORD_DEMO);

    const user = await this.userService.saveUser({
      uuid: generateUUID(),
      firstName: 'User',
      lastName: 'Demo',
      emailVerified: true,
      role: UserRole.QUIZ_CREATOR,
      email: process.env.USER_DEMO,
      password: password,
    });

    return {
      message: 'Congratulations User Demo created successfully.',
      result: plainToClass(User, user),
    };
  }

  async validateUser({ email, password }: ValidateUserAttributes) {
    const user = await this.userService.findOneUser({ email });

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await compareHash(password, user.password);

    return isPasswordValid ? user : null;
  }

  async registerUser(registerUserAttributes: RegisterUserAttributes): Promise<MessageEntityResponse<User>> {
    const password = await hash(registerUserAttributes.password);
    const confirmationCode = generateStringNumeric(6);
    const confirmationCodeHashed = await hash(confirmationCode);

    const user = await this.userService.createUser({
      ...registerUserAttributes,
      password,
      confirmationCode: confirmationCodeHashed,
      uuid: generateUUID(),
    });

    await this.emailService.sendRegistration({
      recipient: user.email,
      subject: `Welcome to ${process.env.APP_NAME} ${user.firstName}`,
      values: {
        firstName: user.firstName,
        confirmationCode,
        activationLink: `${registerUserAttributes.returnUrl}/auth/verify?email=${user.email}`,
      },
    });

    await this.userService.saveUser(user);

    return {
      message: "Congratulations on successfully creating your account! We're glad to have you join us. Let us know if you need assistance.",
      result: plainToClass(User, user),
    };
  }

  async statusUser(statusUserAttributes: Express.User): Promise<MessageEntityResponse<User>> {
    return {
      message: "The user's status has been successfully obtained.",
      result: plainToClass(User, statusUserAttributes),
    };
  }

  async loginUser(statusUserAttributes: Express.User): Promise<MessageEntityResponse<User>> {
    return {
      message: "The user's authentication has been successfully obtained.",
      result: plainToClass(User, statusUserAttributes),
    };
  }

  async verifyEmailUser({ email, confirmationCode }: VerifyEmailUserAttributes): Promise<MessageEntityResponse<User>> {
    const user = await this.userService.findOneUser({ email });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.emailVerified) {
      throw new HttpException('The email address has already been verified.', HttpStatus.BAD_REQUEST);
    }

    const isValid = await compareHash(confirmationCode, user.confirmationCode);

    if (!isValid) {
      throw new HttpException('The confirmation code provided is not valid.', HttpStatus.BAD_REQUEST);
    }

    user.emailVerified = true;
    user.emailVerifiedAt = new Date();
    user.confirmationCode = null;

    this.userService.saveUser(user);

    return {
      message: "The user's email has been successfully verified.",
    };
  }

  async requestResetPassword({ email, returnUrl }: RequestResetPasswordAttributes): Promise<MessageEntityResponse<User>> {
    const user = await this.userService.findOneUser({ email });

    if (!user) {
      throw new UserNotFoundException();
    }

    const passwordResetToken = generateToken();
    const passwordResetTokenHashed = await hash(passwordResetToken);
    const passwordResetLink = `${returnUrl}/auth/reset-password?uuid=${user.uuid}&token=${passwordResetToken}`;

    user.passwordResetToken = passwordResetTokenHashed;
    user.passwordResetTokenReqAt = new Date();

    await this.emailService.sendResetPasswordRequest({
      recipient: user.email,
      subject: `Let's Reset Your Password ${user.firstName} on ${process.env.APP_NAME}!`,
      values: {
        firstName: user.firstName,
        passwordResetLink,
      },
    });

    this.userService.saveUser(user);

    return {
      statusCode: HttpStatus.OK,
      message:
        "We've received a request to reset your password. Please check your email for further instructions, including a link to reset your password.",
    };
  }

  async resetPassword({ uuid, token, password }: ResetPasswordAttributes): Promise<MessageEntityResponse<User>> {
    const user = await this.userService.findOneUser({ uuid });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!user.passwordResetToken) {
      throw new HttpException(
        "We couldn't find your account associated with the provided token for resetting your password. Please try again. Thank you!",
        HttpStatus.BAD_REQUEST
      );
    }

    const isValid = await compareHash(token, user.passwordResetToken);

    if (!isValid) {
      throw new HttpException(
        "The provided token is invalid. Please ensure you're using the correct token. Thank you for your understanding!",
        HttpStatus.BAD_REQUEST
      );
    }

    user.password = await hash(password);
    user.passwordResetToken = null;
    user.passwordResetTokenReqAt = null;

    this.userService.saveUser(user);

    return {
      statusCode: HttpStatus.OK,
      message: "Your password has been successfully updated. You're all set! Welcome back!",
    };
  }
}
