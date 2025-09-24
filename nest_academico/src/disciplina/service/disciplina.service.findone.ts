import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { ConverterDisciplina } from '../dto/converter/disciplina.converter';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Disciplina } from '../entities/disciplina.entity';

@Injectable()
export class DisciplinaServiceFindOne {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async findOne(idDisciplina: number): Promise<DisciplinaResponse | null> {
    const disciplinaExistente = await this.findById(idDisciplina);
    if (!disciplinaExistente) {
      throw new EntityNotFoundException(`${DISCIPLINA.OPERACAO.POR_ID.NAO_LOCALIZADO} - ${idDisciplina}`);
    }
    return ConverterDisciplina.toDisciplinaResponse(disciplinaExistente);
  }

  async findById(idDisciplina: number): Promise<Disciplina | null> {
    try {
      const disciplina = await this.disciplinaRepository
        .createQueryBuilder(DISCIPLINA.ALIAS)
        .where(`${DISCIPLINA.ALIAS}.${DISCIPLINA.FIELDS.ID}= :idDisciplina`, { idDisciplina: idDisciplina })
        .getOne();

      return disciplina;
    } catch (error: any) {
      tratarErroBanco(error, idDisciplina, DISCIPLINA.ENTITY);
    }
  }
}
