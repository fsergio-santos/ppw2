import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { ROTA_AUTH, SERVIDOR } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EmailException } from 'src/commons/exceptions/error/email.exception';
import { EmailService } from 'src/email/service/email.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { ConverterAuth } from '../dto/converter/auth.converter';
import { RegisterUsuarioRequest } from '../dto/request/register.usuario.request';
import { HashingService } from '../hash/hashing.service';
import { TokenHelperService } from './jwt.configuration.service';

@Injectable()
export class RegisterUsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly hashingService: HashingService,
    private readonly emailService: EmailService,
    private readonly tokenHelperService: TokenHelperService,
  ) {}

  async register(registerUsuarioRequest: RegisterUsuarioRequest): Promise<boolean> {
    const usuario = ConverterAuth.toUsuario(registerUsuarioRequest);

    if (!usuario) {
      throw new UnprocessableEntityException(MENSAGENS_GENERICAS.DADOS_INVALIDOS);
    }

    const usuarioCadastrado = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.EMAIL = :email', { email: usuario.email })
      .getOne();

    if (usuarioCadastrado) {
      throw new EmailException(`${MENSAGENS_GENERICAS.EMAIL_CADASTRADO} -  ${usuario.email} `);
    }

    usuario.senha = await this.hashingService.hash(registerUsuarioRequest.senha);
    usuario.ativo = 0;

    try {
      await this.usuarioRepository.save(usuario);
    } catch (error: any) {
      tratarErroBanco(error);
    }

    const tokens = await this.tokenHelperService.createTokens(usuario);

    if (!tokens) {
      throw new JsonWebTokenError(MENSAGENS_GENERICAS.TOKEN_INVALIDO);
    }

    const sendEmailDto = {
      sender: 'nest_academico',
      recipients: [usuario.email],
      subject: 'Bem-vindo ao Nest Acadêmico',
      template: 'message',
      context: {
        name: usuario.nomeUsuario,
        email: usuario.email,
        link: `link: ${SERVIDOR}${ROTA_AUTH.BASE}/validate?token=${tokens.accessToken}`,
      },
    };

    await this.emailService.sendEmail(sendEmailDto);

    return true;
  }
}
