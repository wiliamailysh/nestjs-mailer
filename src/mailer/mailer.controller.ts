import { Controller, Post, Req } from '@nestjs/common';
import { MailjetService } from 'nest-mailjet';
import { Request } from 'express';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailjetService: MailjetService) {}

  @Post('send')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async send(@Req() request: Request) {
    console.log('Here is my request ----> ', request);
    const { email, template_id, personalizations } = request.body;
    const { given_name, last_name, id: userId, lang } = personalizations;

    console.log('email', email);
    console.log('template_id', template_id);
    console.log('given_name', given_name);
    console.log('last_name', last_name);
    console.log('userId', userId);
    console.log('lang', lang);

    const repl = await this.mailjetService.send({
      Messages: [
        {
          From: {
            Email: 'vdouay@kaliop.com',
          },
          To: [
            {
              Email: email || 'vdouay@kaliop.com',
            },
          ],
          TemplateID: 4573833,
          TemplateLanguage: true,
          Subject: 'Your email flight plan!',
        },
      ],
    });
    return repl.body.Messages[0].Status;
  }
}
