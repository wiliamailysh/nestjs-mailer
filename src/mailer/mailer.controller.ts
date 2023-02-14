import { Controller, Post, Req } from '@nestjs/common';
import { MailjetService } from 'nest-mailjet';
import { Request } from 'express';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailjetService: MailjetService) {}

  @Post('send')
  async send(@Req() request: Request) {
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
    return {
      status: repl.body.Messages[0].Status,
      request: JSON.stringify(request),
    };
  }
}
