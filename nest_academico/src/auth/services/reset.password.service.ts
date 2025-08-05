import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioServiceFindOne } from 'src/usuario/service/usuario.service.findone';
import { Repository } from 'typeorm';
import { ResetPasswordRequest } from '../dto/request/reset.password.request';
import { HashingService } from '../hash/hashing.service';
import { TokenHelperService } from './jwt.configuration.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly tokenHelperService: TokenHelperService,
    private readonly usuarioServiceFindOne: UsuarioServiceFindOne,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  async resetPassword(resetPasswordRequest: ResetPasswordRequest): Promise<boolean | null> {
    if (!resetPasswordRequest) {
      throw new UnprocessableEntityException(MENSAGENS_GENERICAS.DADOS_INVALIDOS);
    }
    const sub = await this.tokenHelperService.verifyToken(resetPasswordRequest.token);

    const usuario = await this.usuarioServiceFindOne.findById(sub);

    if (!usuario) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${sub}`);
    }

    usuario.senha = await this.hashingService.hash(resetPasswordRequest.senha);

    const result = await this.usuarioRepository
      .createQueryBuilder()
      .update(Usuario)
      .set({ senha: usuario.senha })
      .where('idUsuario = :idUsuario', { idUsuario: usuario.idUsuario })
      .execute();

    if (result.affected === 0) {
      throw new EntityNotFoundException(MENSAGENS_GENERICAS.NAO_ENCONTRADO);
    } else if (result.affected === 1) {
      return true;
    }

    return null;
  }
}
