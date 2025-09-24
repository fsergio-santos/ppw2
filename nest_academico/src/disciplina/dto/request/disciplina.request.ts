import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { DISCIPLINA } from '../../constants/disciplina.constants';

export class DisciplinaRequest {
  @ApiProperty({ description: DISCIPLINA.SWAGGER.ID })
  @Type(() => Number)
  @IsOptional()
  idDisciplina?: number;

  @ApiProperty({ description: DISCIPLINA.SWAGGER.PERIODO })
  @Type(() => Number)
  @IsInt({ message: DISCIPLINA.INPUT_ERROR.PERIODO })
  periodo: number = 0;

  @ApiProperty({ description: DISCIPLINA.SWAGGER.NOME })
  @IsNotEmpty({ message: DISCIPLINA.INPUT_ERROR.NOME.TXT })
  @IsString()
  @MaxLength(20, {
    message: `${DISCIPLINA.INPUT_ERROR.NOME.LEN} 20 caracteres`,
  })
  nomeDisciplina: string = '';

  @ApiProperty({ description: DISCIPLINA.SWAGGER.IDPROFESSOR })
  @Type(() => Number)
  @IsInt({ message: DISCIPLINA.INPUT_ERROR.IDPROFESSOR })
  idProfessor: number = 0;

  constructor(data: Partial<DisciplinaRequest> = {}) {
    Object.assign(this, data);
  }
}
