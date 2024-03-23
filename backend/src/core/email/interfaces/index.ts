import { SendRegistrationType, SendResetPasswordRequestType } from 'src/core/types/email';

export interface IEmailService {
  sendRegistration(sendRegistrationAttributes: SendRegistrationType): Promise<void>;
  sendResetPasswordRequest(sendResetPasswordRequestAttributes: SendResetPasswordRequestType): Promise<void>;
}
