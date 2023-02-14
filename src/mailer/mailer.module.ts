import { Module } from '@nestjs/common';
import { MailjetModule } from 'nest-mailjet';
import { MailerController } from './mailer.controller';

@Module({
  imports: [
    MailjetModule.registerAsync({
      useFactory: () => ({
        // apiKey: process.env.MAILJET_API_KEY,
        // apiSecret: process.env.MAILJET_API_SECRET,
        apiKey: '215fd08a28a20eab3959657afff9c71d',
        apiSecret: '3252f19d5bb8b49d0f3009f66ad3f715',
      }),
    }),
  ],
  controllers: [MailerController],
})
export class MailerModule {}
