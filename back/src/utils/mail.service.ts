import { MailerService } from '@nestjs-modules/mailer';
import * as Mailgen from 'mailgen';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendEmailDto } from 'src/modules/users/dto/send-email.dto';

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Motors Shop',
    link: 'https://grupo38-t14-projeto-fullstack.vercel.app',
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

  resetPasswordTemplate(
    userEmail: string,
    userName: string,
    resetToken: string,
  ) {
    const email = {
      body: {
        name: userName,
        intro:
          'Você recebeu esse e-mail porque um pedido de redefinição de senha da sua conta foi feito.',
        action: {
          instructions: 'Clique no botão abaixo para redefinir uma nova senha:',
          button: {
            color: '#4529E6',
            text: 'Redefina sua senha',
            link: `https://grupo38-t14-projeto-fullstack.vercel.app/resetPassword/${resetToken}`,
          },
        },
        greeting: 'Olá',
        signature: 'Atenciosamente',
        outro:
          'Se você não fez esse pedido de redefinição de senha, não clique no botão e desconsidere esse e-mail.',
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
