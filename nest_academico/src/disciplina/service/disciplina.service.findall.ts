import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { ENTITY_ALIAS } from '../../commons/constants/mensagem.sistema';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/paginacao.sistema';
import { ValidationFields } from '../../commons/validation/field.validation';
import { DISCIPLINA, fieldsDisciplina } from '../constants/disciplina.constants';
import { ConverterDisciplina } from '../dto/converter/disciplina.converter';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Disciplina } from '../entities/disciplina.entity';

@Injectable()
export class DisciplinaServiceFindAll {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async findAllPaginateServer(
    page: number,
    pageSize: number,
    field: string,
    order: string,
    search?: string,
  ): Promise<Page<DisciplinaResponse>> {
    ValidationFields.validarCampo(field, fieldsDisciplina, ENTITY_ALIAS.DISCIPLINA);

    const pageable = new Pageable(page, pageSize, field, order, fieldsDisciplina);

    try {
      const query = this.disciplinaRepository
        .createQueryBuilder(DISCIPLINA.ALIAS)
        .orderBy(`${DISCIPLINA.ALIAS}.${pageable.field}`, pageable.order)
        .offset(pageable.offSet)
        .limit(pageable.pageSize);

      if (search) {
        query.where(`${DISCIPLINA.ALIAS}.${field} LIKE :search`, { search: `%${search}%` });
      }

      const disciplinas = await query.getMany();

      const totalElements = await this.disciplinaRepository.count();

      const dados = ConverterDisciplina.toListDisciplinaResponse(disciplinas);

      return Page.of(dados, totalElements, pageable);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }

  async findAllPaginateClient(): Promise<DisciplinaResponse[]> {
    try {
      const disciplinas = await this.disciplinaRepository.createQueryBuilder(DISCIPLINA.ALIAS).getMany();
      return ConverterDisciplina.toListDisciplinaResponse(disciplinas);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}

//const skip = (page - 1) * limit;

// const disciplina = await this.disciplinaRepository.find({
//   order: { nomeDisciplina: 'ASC' },
//    skip,
//    take: limit,
// });

// const disciplinas = await this.disciplinaRepository
//   .createQueryBuilder('disciplina')
//   .orderBy(`disciplina.${field}`, order) // sempre bom ordenar
//   .offset(skip)
//   .limit(limit) // equivalente ao FETCH NEXT
//   .getMany();
