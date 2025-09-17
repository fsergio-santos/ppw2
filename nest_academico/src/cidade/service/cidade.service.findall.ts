import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../../commons/response/paginacao.sistema';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { CidadeResponse } from '../dto/response/cidade.response';
import { Cidade } from '../entities/cidade.entity';

@Injectable()
export class CidadeServiceFindAll {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async findAll(
    field: string = 'nomeCidade',
    order: 'ASC' | 'DESC' = 'ASC',
    page?: number,
    limit?: number,
  ): Promise<Page<CidadeResponse>> {
    //const skip = (page - 1) * limit;

    const allowedFields: (keyof Cidade)[] = ['codCidade', 'nomeCidade'];

    let sortField: keyof Cidade = allowedFields.includes(field as keyof Cidade)
      ? (field as keyof Cidade)
      : 'nomeCidade';

    order = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // const cidade = await this.cidadeRepository.find({
    //   order: { nomeCidade: 'ASC' },
    //    skip,
    //    take: limit,
    // });

    const query = this.cidadeRepository
      .createQueryBuilder('cidade')
      .orderBy(`cidade.${sortField}`, order);

    if (page && limit) {
      const skip = (page - 1) * limit;
      query.offset(skip).limit(limit);
    }
    // const cidades = await this.cidadeRepository
    //   .createQueryBuilder('cidade')
    //   .orderBy(`cidade.${field}`, order) // sempre bom ordenar
    //   .offset(skip)
    //   .limit(limit) // equivalente ao FETCH NEXT
    //   .getMany();

    const cidades = await query.getMany();

    const totalElements = await this.cidadeRepository.count();

    const dados = ConverterCidade.toListCidadeResponse(cidades);

    return Page.of(dados, totalElements, limit, page);
  }
}
