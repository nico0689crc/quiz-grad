import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Inject, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';

import { Routes, Services } from 'src/core/constants';
import { DoesUserExist } from 'src/core/guards/does-user-exist';
import { TransformInterceptor } from 'src/core/interceptors/transform-interceptor';
import { LocalAuthGuard } from 'src/core/guards/local-auth-guard';
import { AuthenticatedGuard } from 'src/core/guards/authenticated-guard';

import { RegisterUserDto } from './dtos/create-user-dto';

import { AuthenticatedRequest, IAuthService } from './interfaces/auth';
import { VerifyEmailUserDto } from './dtos/verify-email-user-dto';
import { RequestResetPasswordDto } from './dtos/request-reset-password-dto';
import { ResetPasswordDto } from './dtos/reset-password-dto';

@UseInterceptors(TransformInterceptor)
@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) { }

  @UseGuards(DoesUserExist)
  @Post(Routes.REGISTER)
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post(Routes.LOGIN)
  async loginUser(@Req() req: AuthenticatedRequest) {
    return this.authService.statusUser(req.user);
  }

  @Delete(Routes.LOGOUT)
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    req.logout((err) => {
      return err ? res.sendStatus(HttpStatus.BAD_REQUEST) : res.sendStatus(HttpStatus.OK);
    });
  }

  @Get(Routes.STATUS)
  @UseGuards(AuthenticatedGuard)
  async status(@Req() req: AuthenticatedRequest) {
    return this.authService.statusUser(req.user);
  }

  @Get(Routes.CREATE_USER_DEMO)
  @UseGuards(AuthenticatedGuard)
  async createUserDemo(@Req() req: AuthenticatedRequest) {
    return this.authService.createUserDemo(req.user);
  }

  @Post(Routes.VERIFY_EMAIL)
  async verifyUserEmail(@Body() verifyEmailUserDto: VerifyEmailUserDto) {
    return this.authService.verifyEmailUser(verifyEmailUserDto);
  }

  @Post(Routes.REQUEST_RESET_PASSWORD)
  async requestResetPassword(@Body() requestResetPasswordDto: RequestResetPasswordDto) {
    return this.authService.requestResetPassword(requestResetPasswordDto);
  }

  @Post(Routes.RESET_PASSWORD)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
