import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { ConverterProfessor } from '../dto/converter/professor.converter';
import { Professor } from '../entities/professor.entity';
import { ProfessorResponse } from '../dto/response/professor.response';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class ProfessorServiceFindOne {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async findOne(idProfessor: number): Promise<ProfessorResponse> {
    const professor = await this.findById(idProfessor);

    if (!professor) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} ${idProfessor}`);
    }

    return ConverterProfessor.toProfessorResponse(professor);
  }

  async findById(idProfessor: number): Promise<Professor | null> {
    const professor = await this.professorRepository
      .createQueryBuilder('professor')
      .leftJoinAndSelect('professor.usuario', 'usuario')
      .leftJoinAndSelect('usuario.cidade', 'cidade')
      .where('professor.ID_PROFESSOR = :idProfessor', { idProfessor: idProfessor })
      .getOne();

    return professor;
  }
}
