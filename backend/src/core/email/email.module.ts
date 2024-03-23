import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendGridClient } from './sendgrid-client';

@Module({
  imports: [],
  providers: [EmailService, SendGridClient],
  exports: [EmailService],
})
export class EmailModule {}
