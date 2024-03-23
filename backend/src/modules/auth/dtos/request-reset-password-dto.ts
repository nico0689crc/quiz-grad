import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class RequestResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  returnUrl: string;
}
