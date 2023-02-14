import { Controller, Post } from '@nestjs/common';
import { MailjetService } from 'nest-mailjet';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailjetService: MailjetService) {}

  @Post('send')
  async send() {
    const repl = await this.mailjetService.send({
      Messages: [
        {
          From: {
            Email: 'vdouay@kaliop.com',
          },
          To: [
            {
              Email: 'vdouay@kaliop.com',
            },
          ],
          Subject: 'nestjs test mail',
          TextPart: 'nestjs test mail content',
        },
      ],
    });
    return repl.body.Messages[0].Status;
  }
}
