import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { TIPO_USUARIO } from 'src/usuario/enum/tipo.usuario.enum';
import { Match } from '../../../commons/decorators/match.senha.decorator';
import { USUARIO } from '../../constants/usuario.constants';

export class UsuarioRequest {
  @ApiProperty({ description: USUARIO.SWAGGER.ID, example: '1' })
  @Type(() => Number)
  @IsOptional()
  idUsuario?: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.CODUSUARIO, example: 'COD120' })
  @IsNotEmpty({ message: USUARIO.INPUT_ERROR.CODUSUARIO.BLANK })
  @IsString({ message: USUARIO.INPUT_ERROR.CODUSUARIO.STRING })
  @MinLength(6, { message: USUARIO.INPUT_ERROR.CODUSUARIO.MIN_LEN })
  @MaxLength(20, { message: USUARIO.INPUT_ERROR.CODUSUARIO.MAX_LEN })
  codUsuario: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.NOME, example: 'Antônio da Silva' })
  @IsNotEmpty({ message: USUARIO.INPUT_ERROR.NOME.BLANK })
  @IsString({ message: USUARIO.INPUT_ERROR.NOMEALUNO.STRING })
  @MinLength(6, { message: USUARIO.INPUT_ERROR.NOMEALUNO.MIN_LEN })
  @MaxLength(100, { message: USUARIO.INPUT_ERROR.NOMEALUNO.MAX_LEN })
  nomeUsuario: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.EMAIL, example: 'antonio@dominio.com.br' })
  @IsNotEmpty({ message: USUARIO.INPUT_ERROR.EMAIL.BLANK })
  @IsEmail({}, { message: USUARIO.INPUT_ERROR.EMAIL.VALID })
  @MaxLength(100, { message: USUARIO.INPUT_ERROR.EMAIL.LEN })
  email: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.SENHA, example: '1aAb#1345' })
  @IsNotEmpty({ message: USUARIO.INPUT_ERROR.SENHA.BLANK })
  @MaxLength(20, { message: USUARIO.INPUT_ERROR.SENHA.MAX_LEN })
  @MinLength(6, { message: USUARIO.INPUT_ERROR.SENHA.MIN_LEN })
  senha: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.CONFIRM_SENHA, example: '1aAb#1345' })
  @IsNotEmpty({ message: USUARIO.INPUT_ERROR.CONFIRMSENHA.BLANK })
  @Match('senha', { message: USUARIO.INPUT_ERROR.CONFIRMSENHA.EQUALS })
  confirmSenha: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.FOTO })
  @IsString({ message: USUARIO.INPUT_ERROR.FOTO.STRING })
  @IsOptional()
  foto?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.TIPO, example: '1' })
  @Type(() => Number)
  @IsNotEmpty({ message: USUARIO.INPUT_ERROR.TIPO.BLANK })
  @IsEnum(TIPO_USUARIO, { message: USUARIO.INPUT_ERROR.TIPO.VALID })
  tipo: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.IDCIDADE, example: '1' })
  @Type(() => Number)
  @IsNotEmpty({ message: USUARIO.INPUT_ERROR.IDCIDADE.VALID })
  @IsInt()
  idCidade: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.IDALUNO, example: '1' })
  @ValidateIf((o) => o.tipo === 1)
  @Type(() => Number)
  @IsInt({ message: USUARIO.INPUT_ERROR.IDALUNO.VALID })
  idAluno?: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.CODALUNO, example: 'COD121' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.ALUNO)
  @IsString({ message: USUARIO.INPUT_ERROR.CODALUNO.STRING })
  @MinLength(6, { message: USUARIO.INPUT_ERROR.CODALUNO.MIN_LEN })
  @MaxLength(20, { message: USUARIO.INPUT_ERROR.CODALUNO.MAX_LEN })
  codAluno?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.NOMEALUNO, example: 'Antônio da Silva' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.ALUNO)
  @IsString({ message: USUARIO.INPUT_ERROR.NOMEALUNO.STRING })
  @MinLength(6, { message: USUARIO.INPUT_ERROR.NOMEALUNO.MIN_LEN })
  @MaxLength(20, { message: USUARIO.INPUT_ERROR.NOMEALUNO.MAX_LEN })
  nomeAluno?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.IDADE, example: '21' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.ALUNO)
  @Type(() => Number)
  @IsInt({ message: USUARIO.INPUT_ERROR.IDADE.VALID })
  idade?: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.IDPROFESSOR, example: '1' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.PROFESSOR)
  @Type(() => Number)
  @IsInt({ message: USUARIO.INPUT_ERROR.IDPROFESSOR.VALID })
  idProfessor?: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.NOMEPROFESSOR, example: 'Antônio da Silva' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.PROFESSOR)
  @IsString({ message: USUARIO.INPUT_ERROR.NOMEPROFESSOR.STRING })
  @MinLength(6, { message: USUARIO.INPUT_ERROR.NOMEPROFESSOR.MIN_LEN })
  @MaxLength(20, { message: USUARIO.INPUT_ERROR.NOMEPROFESSOR.MAX_LEN })
  nomeProfessor?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.CODPROFESSOR, example: 'COD121' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.PROFESSOR)
  @IsString({ message: USUARIO.INPUT_ERROR.CODPROFESSOR.STRING })
  @MinLength(6, { message: USUARIO.INPUT_ERROR.CODPROFESSOR.MIN_LEN })
  @MaxLength(20, { message: USUARIO.INPUT_ERROR.CODPROFESSOR.MAX_LEN })
  codProfessor?: string = '';

  constructor(data: Partial<UsuarioRequest> = {}) {
    Object.assign(this, data);
  }
}
