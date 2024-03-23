import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { PasswordMatch } from 'src/core/decorators/password-match';

export class ResetPasswordDto {
  @IsUUID()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,100}$/, {
    message:
      'Your password must contain at least two uppercase letters, one special character, two digits, three lowercase letters, and be of minimum length 8.',
  })
  password: string;

  @PasswordMatch('password')
  passwordConfirmation: string;
}
