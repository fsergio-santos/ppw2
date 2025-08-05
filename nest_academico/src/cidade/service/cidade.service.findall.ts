import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cidade } from '../entities/cidade.entity';
import { CidadeResponse } from '../dto/response/cidade.response';
import { ConverterCidade } from '../dto/converter/cidade.converter';

@Injectable()
export class CidadeServiceFindAll {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async findAll(): Promise<CidadeResponse[]> {
    const cidade = await this.cidadeRepository.find();
    return ConverterCidade.toListCidadeResponse(cidade);
  }
}
