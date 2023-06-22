import { MailerService } from '@nestjs-modules/mailer';
import Mailgen from 'mailgen';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendEmailDto } from 'src/modules/users/dto/send-email.dto';

//mudar o link
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Motor Shop',
    link: 'http://localhost:3001',
  },
});

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject, text }: SendEmailDto) {
    await this.mailerService
      .sendMail({ to, subject, html: text })
      .then(() => {
        console.log('Email enviado com sucesso!');
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException(
          'Erro ao enviar email. Tente novamente mais tarde!',
        );
      });
  }

  //customizar mensagem
  resetPasswordTemplate(
    userEmail: string,
    userName: string,
    resetToken: string,
  ) {
    const email = {
      body: {
        name: userName,
        intro:
          'You have received this email because a password reset request for your account was received.',
        action: {
          instructions: 'Click the button below to reset your password:',
          button: {
            color: '#DC4D2F',
            text: 'Reset your password',
            link: `http://localhost:3001/users/resetPassword/${resetToken}`,
          },
        },
        outro:
          'If you did not request a password reset, no further action is required on your part.',
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailTemplate = {
      to: userEmail,
      subject: 'Reset de senha',
      text: emailBody,
    };

    return emailTemplate;
  }
}
