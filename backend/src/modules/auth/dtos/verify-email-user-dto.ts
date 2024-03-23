import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyEmailUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  confirmationCode: string;
}
