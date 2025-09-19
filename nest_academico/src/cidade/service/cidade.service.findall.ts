import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { fieldsCidade } from '../../commons/constants/cidade.constants';
import { ENTITY_ALIAS } from '../../commons/constants/mensagem.sistema';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/paginacao.sistema';
import { ValidationFields } from '../../commons/validation/field.validation';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { CidadeResponse } from '../dto/response/cidade.response';
import { Cidade } from '../entities/cidade.entity';

@Injectable()
export class CidadeServiceFindAll {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async findAllPaginateServer(
    page: number,
    pageSize: number,
    field: string,
    order: string,
  ): Promise<Page<CidadeResponse>> {
    ValidationFields.validarCampo(field, fieldsCidade, ENTITY_ALIAS.CIDADE);

    const pageable = new Pageable(page, pageSize, field, order, fieldsCidade);

    const cidades = await this.cidadeRepository
      .createQueryBuilder(ENTITY_ALIAS.CIDADE)
      .orderBy(`${ENTITY_ALIAS.CIDADE}.${pageable.field}`, pageable.order)
      .offset(pageable.offSet)
      .limit(pageable.pageSize)
      .getMany();

    const totalElements = await this.cidadeRepository.count();

    const dados = ConverterCidade.toListCidadeResponse(cidades);

    return Page.of(dados, totalElements, pageable);
  }

  async findAllPaginateClient(): Promise<CidadeResponse[]> {
    const cidades = await this.cidadeRepository.createQueryBuilder(ENTITY_ALIAS.CIDADE).getMany();
    return ConverterCidade.toListCidadeResponse(cidades);
  }
}

//const skip = (page - 1) * limit;

// const cidade = await this.cidadeRepository.find({
//   order: { nomeCidade: 'ASC' },
//    skip,
//    take: limit,
// });

// const cidades = await this.cidadeRepository
//   .createQueryBuilder('cidade')
//   .orderBy(`cidade.${field}`, order) // sempre bom ordenar
//   .offset(skip)
//   .limit(limit) // equivalente ao FETCH NEXT
//   .getMany();
