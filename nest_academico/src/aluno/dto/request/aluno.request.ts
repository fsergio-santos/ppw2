import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { USUARIO } from '../../../usuario/constants/usuario.constants';
import { ALUNO } from '../../constants/aluno.constants';

export class AlunoRequest {
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ description: ALUNO.SWAGGER.ID, example: '1' })
  idAluno?: number = 0;

  @ApiProperty({ description: ALUNO.SWAGGER.CODIGO, example: 'COD120' })
  @IsNotEmpty({ message: ALUNO.INPUT_ERROR.CODIGO.VALID })
  @IsString({ message: ALUNO.INPUT_ERROR.CODIGO.STRING })
  @MaxLength(20, { message: ALUNO.INPUT_ERROR.CODIGO.MAX_LEN })
  @MinLength(6, { message: ALUNO.INPUT_ERROR.CODIGO.MIN_LEN })
  codAluno: string = '';

  @ApiProperty({ description: ALUNO.SWAGGER.NOME, example: 'Luis Carlos da Silva' })
  @MaxLength(100, { message: ALUNO.INPUT_ERROR.NOME.MAX_LEN })
  @MinLength(6, { message: ALUNO.INPUT_ERROR.NOME.MIN_LEN })
  @IsNotEmpty({ message: ALUNO.INPUT_ERROR.NOME.BLANK })
  @IsString({ message: ALUNO.INPUT_ERROR.NOME.STRING })
  nomeAluno: string = '';

  @ApiProperty({ description: ALUNO.SWAGGER.IDADE, example: '20' })
  @IsInt({ message: 'informe a idade do aluno' })
  idade: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.ID, example: '1' })
  @IsInt({ message: ALUNO.INPUT_ERROR.IDADE.INT })
  idUsuario?: number = 0;

  constructor(data: Partial<AlunoRequest> = {}) {
    Object.assign(this, data);
  }
}
