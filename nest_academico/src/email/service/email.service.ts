import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as hbs from 'handlebars';
import { createTransport, SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer';
import { join } from 'path';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { ErrorException } from 'src/commons/exceptions/error/error.exception';
import { SendEmailDto } from '../dto/send.email.dto';

@Injectable()
export class EmailService {
  private mailTransport: Transporter<SentMessageInfo>;

  constructor(private configService: ConfigService) {
    this.mailTransport = createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: this.configService.get<boolean>('EMAIL_SECURE') ?? false,
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(sendEmailDto: SendEmailDto): Promise<boolean | null> {
    const sender = sendEmailDto.sender ?? {
      name: this.configService.get('EMAIL_FROM_NAME') ?? 'nest_academico',
      address: this.configService.get('EMAIL_FROM') ?? 'no.repliy@localhost.com',
    };

    let htmlBody = sendEmailDto.html;

    if (sendEmailDto.template && sendEmailDto.context) {
      const templatePath = join(__dirname, '..', 'templates', `${sendEmailDto.template}.hbs`);
      const source = fs.readFileSync(templatePath, 'utf8');
      const compiledTemplate = hbs.compile(source);
      htmlBody = compiledTemplate(sendEmailDto.context);
    }

    const mailOptions: SendMailOptions = {
      from: sender,
      to: sendEmailDto.recipients,
      subject: sendEmailDto.subject,
      html: htmlBody,
      text: sendEmailDto.text ?? undefined,
    };

    try {
      await this.mailTransport.sendMail(mailOptions);
      return true;
    } catch (error: any) {
      if (['ECONNECTION', 'ENOTFOUND', 'ETIMEDOUT', 'ECONNREFUSED'].includes(error.code)) {
        throw new ErrorException(MENSAGENS_GENERICAS.ERRO_SMTP, error.message);
      } else {
        throw new ErrorException(MENSAGENS_GENERICAS.ERRO_ENVIO_EMAIL, error.message);
      }
    }
  }
}
