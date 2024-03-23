import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { PasswordMatch } from 'src/core/decorators/password-match';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,100}$/, {
    message:
      'Your password must contain at least two uppercase letters, one special character, two digits, three lowercase letters, and be of minimum length 8.',
  })
  password: string;

  @PasswordMatch('password')
  passwordConfirmation: string;

  @IsString()
  @IsNotEmpty()
  returnUrl: string;
}
