import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { CidadeServiceFindOne } from './cidade.service.findone';
import { Cidade } from '../entities/cidade.entity';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class CidadeServiceRemove {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
    private findOne: CidadeServiceFindOne,
  ) {}

  async remove(idCidade: number): Promise<void> {
    const cidade = await this.findOne.findById(idCidade);
    if (!cidade?.idCidade) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idCidade}.`);
    }
    try {
      await this.cidadeRepository.delete(cidade.idCidade);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}
