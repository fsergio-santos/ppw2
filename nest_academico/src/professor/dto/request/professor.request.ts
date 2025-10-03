import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { USUARIO } from '../../../usuario/constants/usuario.constants';
import { PROFESSOR } from '../../constants/professor.constants';

export class ProfessorRequest {
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ description: PROFESSOR.SWAGGER.ID, example: '1' })
  idProfessor?: number = 0;

  @ApiProperty({ description: PROFESSOR.SWAGGER.CODIGO, example: 'COD120' })
  @IsNotEmpty({ message: PROFESSOR.INPUT_ERROR.CODIGO.BLANK })
  @IsString({ message: PROFESSOR.INPUT_ERROR.CODIGO.STRING })
  @MaxLength(20, { message: PROFESSOR.INPUT_ERROR.CODIGO.MAX_LEN })
  @MinLength(6, { message: PROFESSOR.INPUT_ERROR.CODIGO.MIN_LEN })
  codProfessor?: string;

  @IsNotEmpty({ message: PROFESSOR.INPUT_ERROR.NOME.BLANK })
  @IsString({ message: PROFESSOR.INPUT_ERROR.NOME.STRING })
  @MaxLength(20, { message: PROFESSOR.INPUT_ERROR.NOME.MAX_LEN })
  @MinLength(6, { message: PROFESSOR.INPUT_ERROR.NOME.MIN_LEN })
  nomeProfessor?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.ID, example: '1' })
  @IsInt({ message: 'informe o código do usuário' })
  idUsuario?: number = 0;

  constructor(data: Partial<ProfessorRequest> = {}) {
    Object.assign(this, data);
  }
}
