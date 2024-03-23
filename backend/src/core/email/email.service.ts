import { Injectable } from '@nestjs/common';

import { IEmailService } from './interfaces';

import { SendEmailType, SendRegistrationType, SendResetPasswordRequestType } from '../types/email';
import { SendGridClient } from './sendgrid-client';
import { MailDataRequired } from '@sendgrid/mail';
import { registration, resetPassword } from './templates';

@Injectable()
export class EmailService implements IEmailService {
  constructor(private readonly sendGridClient: SendGridClient) {}

  async sendRegistration(sendRegistrationAttributes: SendRegistrationType): Promise<void> {
    const body = registration(sendRegistrationAttributes);
    return this.sendEmailWithTemplate({ ...sendRegistrationAttributes, body });
  }

  async sendResetPasswordRequest(sendResetPasswordRequestAttributes: SendResetPasswordRequestType): Promise<void> {
    const body = resetPassword(sendResetPasswordRequestAttributes);
    return this.sendEmailWithTemplate({
      ...sendResetPasswordRequestAttributes,
      body,
    });
  }

  private async sendEmailWithTemplate({ recipient, subject, body }: SendEmailType & { body: string }): Promise<void> {
    const mail: MailDataRequired = {
      to: recipient,
      from: process.env.SENDGRID_VERIFIED_EMAIL,
      subject: subject,
      html: body,
    };

    return await this.sendGridClient.send(mail);
  }
}
