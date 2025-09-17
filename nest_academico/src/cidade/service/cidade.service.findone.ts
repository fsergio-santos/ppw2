import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { CidadeResponse } from '../dto/response/cidade.response';
import { Cidade } from '../entities/cidade.entity';

@Injectable()
export class CidadeServiceFindOne {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async findOne(idCidade: number): Promise<CidadeResponse | null> {
    const cidadeExistente = await this.findById(idCidade);
    if (!cidadeExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idCidade}`);
    }
    return ConverterCidade.toCidadeResponse(cidadeExistente);
  }

  async findById(idCidade: number): Promise<Cidade | null> {
    const cidade = await this.cidadeRepository
      .createQueryBuilder('cidade')
      .where('cidade.ID_CIDADE = :idCidade', { idCidade: idCidade })
      .getOne();

    return cidade;
  }
}
