import { Controller, Post, Req } from '@nestjs/common';
import { MailjetService } from 'nest-mailjet';
import { Request } from 'express';

const mailjetTemplateID = {
  sign_up: 4584238,
  verify_email: 4584007,
  update_email: 4584244,
  password_reset: 4584248,
  password_updated: 4584249,
};

// @todo @vdouay translations
const mailjetTemplateSubject = {
  sign_up: 'Confirmation de la soucriprion',
  verify_email: "Confirmation d'email",
  update_email: "Mise à jour de l'email",
  password_reset: 'Modification du mot de passe',
  password_updated: 'Mot de passe mis à jour',
};
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailjetService: MailjetService) {}

  @Post('send')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async send(@Req() request: Request) {
    console.log('Here is my request ----> ', request);
    const { email, template_id, personalizations } = request.body;
    const { given_name, last_name } = personalizations;

    // @todo @vdouay handle errors
    // console.log('email', email);
    // console.log('template_id', template_id);
    // console.log('given_name', given_name);
    // console.log('last_name', last_name);
    // console.log('userId', userId);
    // console.log('lang', lang);

    // Retrieve user info
    // exhibition origin ---> image
    // redirectURL from origin

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
          Variables: {
            exhibitionName: 'foire_de_paris',
            givenName: given_name || false,
            lastName: last_name || false,
          },
          TemplateID: mailjetTemplateID[template_id],
          TemplateLanguage: true,
          Subject: mailjetTemplateSubject[template_id],
        },
      ],
    });
    return repl.body.Messages[0].Status;
  }
}
