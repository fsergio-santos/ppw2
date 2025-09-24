import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DISCIPLINA } from '../../constants/disciplina.constants';

export class DisciplinaResponse {
  @ApiProperty({ description: DISCIPLINA.SWAGGER.ID })
  @Expose()
  idDisciplina?: number;

  @ApiProperty({ description: DISCIPLINA.SWAGGER.PERIODO })
  @Expose()
  periodo: number = 0;

  @ApiProperty({ description: DISCIPLINA.SWAGGER.NOME })
  @Expose()
  nomeDisciplina: string = '';

  @ApiProperty({ description: DISCIPLINA.SWAGGER.IDPROFESSOR })
  @Expose()
  idProfessor: number = 0;

  @ApiProperty({ description: DISCIPLINA.SWAGGER.NOMEPROFESSOR })
  @Expose()
  nomeProfessor: string = '';

  constructor(data: Partial<DisciplinaResponse> = {}) {
    Object.assign(this, data);
  }
}
