import { Injectable } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CLIENTE, ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { UsuarioBloqueadoException } from 'src/commons/exceptions/error/usuario.bloqueado';
import { EmailService } from 'src/email/service/email.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { STATUS_USUARIO } from 'src/usuario/enum/status.usuario.enum';
import { UsuarioServiceFindEmail } from 'src/usuario/service/usuario.service.findemail';
import { Repository } from 'typeorm';
import { ForgotPasswordRequest } from '../dto/request/forgot.password.request';
import { TokenHelperService } from './jwt.configuration.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly usuarioServiceFindEmail: UsuarioServiceFindEmail,
    private readonly emailService: EmailService,
    private readonly tokenHelperService: TokenHelperService,
  ) {}

  async forgotPassword(forgotPassword: ForgotPasswordRequest): Promise<boolean> {
    if (!forgotPassword.email) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${forgotPassword.email}`);
    }

    const usuario = await this.usuarioServiceFindEmail.findByEmail(forgotPassword.email);

    if (!usuario) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${forgotPassword.email}`);
    }

    if (usuario.ativo === STATUS_USUARIO.BLOQUEADO) {
      throw new UsuarioBloqueadoException(MENSAGENS_GENERICAS.ACESSO_PROIBIDO);
    }

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const token = await this.tokenHelperService.createTokenUpdateData(usuario, expiryDate);

    if (!token) {
      throw new JsonWebTokenError(MENSAGENS_GENERICAS.TOKEN_INVALIDO);
    }

    const sendEmailDto = {
      sender: 'nest_academico',
      recipients: [usuario.email],
      subject: 'Solicitação de Redefinição de Senha',
      template: 'message',
      context: {
        name: usuario.nomeUsuario,
        email: usuario.email,
        link: `${CLIENTE}${ROTA_AUTH.CHANGE_PASSWORD}?token=${token}`,
      },
    };

    await this.emailService.sendEmail(sendEmailDto);

    return true;
  }
}
