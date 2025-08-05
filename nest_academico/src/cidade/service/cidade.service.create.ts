import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { Cidade } from '../entities/cidade.entity';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeResponse } from '../dto/response/cidade.response';
import { ConverterCidade } from '../dto/converter/cidade.converter';

@Injectable()
export class CidadeServiceCreate {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async create(cidadeRequest: CidadeRequest): Promise<CidadeResponse> {
    try {
      let cidade = ConverterCidade.toCidade(cidadeRequest);
      cidade = await this.cidadeRepository.save(cidade);
      return ConverterCidade.toCidadeResponse(cidade);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}
