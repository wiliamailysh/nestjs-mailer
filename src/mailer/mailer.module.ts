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
        apiSecret: 'b2442af1eb5965392cbcdc8caaf31800',
      }),
    }),
  ],
  controllers: [MailerController],
})
export class MailerModule {}
