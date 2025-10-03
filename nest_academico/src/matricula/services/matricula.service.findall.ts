import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/paginacao.sistema';
import { ValidationFields } from '../../commons/validation/field.validation';
import { fieldsMatricula, MATRICULA } from '../constants/alunodisciplina.constants';
import { ConverterMatricula } from '../dto/converter/aluno.disciplina.converter';
import { MatriculaResponse } from '../dto/response/aluno.disciplina.response';
import { Matricula } from '../entity/aluno.disciplina.entity';

@Injectable()
export class MatriculaServiceFindAll {
  constructor(
    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,
  ) {}

  async findAllPaginateServer(
    page: number,
    pageSize: number,
    field: string,
    order: string,
    search?: string,
  ): Promise<Page<MatriculaResponse>> {
    ValidationFields.validarCampo(field, fieldsMatricula, MATRICULA.ALIAS);

    const pageable = new Pageable(page, pageSize, field, order, fieldsMatricula);

    try {
      const query = this.matriculaRepository
        .createQueryBuilder(MATRICULA.ALIAS)
        .orderBy(`${MATRICULA.ALIAS}.${pageable.field}`, pageable.order)
        .offset(pageable.offSet)
        .limit(pageable.pageSize);

      if (search) {
        query.where(`${MATRICULA.ALIAS}.${field} LIKE :search`, { search: `%${search}%` });
      }

      const matriculas = await query.getMany();

      const totalElements = await this.matriculaRepository.count();

      const dados = ConverterMatricula.toListMatriculaResponse(matriculas);

      return Page.of(dados, totalElements, pageable);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }

  async findAllPaginateClient(): Promise<MatriculaResponse[]> {
    const matriculas = await this.matriculaRepository.createQueryBuilder(MATRICULA.ALIAS).getMany();
    return ConverterMatricula.toListMatriculaResponse(matriculas);
  }
}

//const skip = (page - 1) * limit;

// const matricula = await this.matriculaRepository.find({
//   order: { nomeMatricula: 'ASC' },
//    skip,
//    take: limit,
// });

// const matriculas = await this.matriculaRepository
//   .createQueryBuilder('matricula')
//   .orderBy(`matricula.${field}`, order) // sempre bom ordenar
//   .offset(skip)
//   .limit(limit) // equivalente ao FETCH NEXT
//   .getMany();
