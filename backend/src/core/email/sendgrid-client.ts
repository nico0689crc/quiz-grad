import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class SendGridClient {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(mail: MailDataRequired): Promise<void> {
    await SendGrid.send(mail);
  }
}
