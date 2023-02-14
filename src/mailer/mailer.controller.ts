import { Controller, Post, Body, Req } from '@nestjs/common';
import { MailjetService } from 'nest-mailjet';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailjetService: MailjetService) {}

  @Post('send')
  async send(@Body() body, @Req() req) {
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
      payload: JSON.stringify(body),
      req: JSON.stringify(req),
    };
  }
}
