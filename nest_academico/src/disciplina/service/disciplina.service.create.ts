import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { EntityRegisteredExcepiton } from '../../commons/exceptions/error/entity.cadastrada.exception';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { ConverterDisciplina } from '../dto/converter/disciplina.converter';
import { DisciplinaRequest } from '../dto/request/disciplina.request';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Disciplina } from '../entities/disciplina.entity';

@Injectable()
export class DisciplinaServiceCreate {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async create(disciplinaRequest: DisciplinaRequest): Promise<DisciplinaResponse> {
    try {
      let disciplina = ConverterDisciplina.toDisciplina(disciplinaRequest);

      const disciplinaCadastrada = await this.disciplinaRepository
        .createQueryBuilder(DISCIPLINA.ALIAS)
        .where(`${DISCIPLINA.ALIAS}.${DISCIPLINA.FIELDS.NOME} = :nome`, { nome: disciplina.nomeDisciplina })
        .getOne();

      if (disciplinaCadastrada) {
        throw new EntityRegisteredExcepiton(DISCIPLINA.OPERACAO.CRIAR.EXISTE);
      }

      disciplina = await this.disciplinaRepository.save(disciplina);

      return ConverterDisciplina.toDisciplinaResponse(disciplina);
    } catch (error: any) {
      tratarErroBanco(error, undefined, DISCIPLINA.ENTITY);
    }
  }
}
