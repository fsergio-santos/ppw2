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
  ValidateIf,
} from 'class-validator';
import { TIPO_USUARIO } from 'src/usuario/enum/tipo.usuario.enum';
import { Match } from '../../../commons/decorators/match.senha.decorator';

export class UsuarioRequest {
  @Type(() => Number)
  @IsOptional()
  idUsuario?: number = 0;

  @ApiProperty({ description: 'Código do usuário ' })
  @IsNotEmpty({ message: 'O código do usuário deve ser informado ' })
  @IsString()
  @MaxLength(20, {
    message: 'O tamanho máximo é de 20 caracteres para o código do usuário',
  })
  codUsuario: string = '';

  @ApiProperty({ description: 'Nome do usuário ' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o nome do usuário',
  })
  @IsNotEmpty({ message: 'O código do usuário deve ser informado ' })
  @IsString()
  nomeUsuario: string = '';

  @ApiProperty({ description: 'E-mail do usuário ' })
  @IsString()
  @IsEmail({}, { message: 'Informe o endereço de e-mail válido ' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 255 caracteres para o e-mail',
  })
  email: string = '';

  @ApiProperty({ description: 'Senha do usuário ' })
  @IsString()
  // @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/, {
  //   message:
  //     'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  // })
  senha: string = '';

  @ApiProperty({ description: '' })
  @IsString()
  // @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/, {
  //   message:
  //     'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  // })
  @IsNotEmpty({ message: 'O campo confirmSenha é obrigatório' })
  @Match('senha', { message: 'As senhas não coincidem ' })
  confirmSenha: string = 'Senha do usuário ';

  @ApiProperty({ description: 'Foto do usuário ' })
  @IsString()
  @IsOptional()
  foto?: string;

  @ApiProperty({ description: '' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'O tipo do usuário é obrigatório.' })
  @IsEnum(TIPO_USUARIO, { message: 'O tipo do usuário deverser Aluno { 1 }, ou Professor { 2 }' })
  tipo: number = 0;

  @ApiProperty({ description: 'Código de identificação da cidade ' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'O código da cidade deve ser informado.' })
  @IsInt()
  idCidade: number = 0;

  @ApiProperty({ description: 'Código de identificação do aluno ' })
  @ValidateIf((o) => o.tipo === 1)
  @Type(() => Number)
  @IsInt({ message: 'O código do aluno deve ser informado ' })
  idAluno?: number = 0;

  @ApiProperty({ description: 'Código do aluno ' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.ALUNO)
  @IsString({ message: 'Informe o código do aluno 11' })
  @IsNotEmpty({ message: 'O código do aluno é obrigatório 12' })
  codAluno?: string = '';

  @ApiProperty({ description: 'Nome do aluno ' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.ALUNO)
  @IsString({ message: 'O nome do aluno deve ser informado ' })
  @IsNotEmpty({ message: 'O nome do aluno é obrigatório ' })
  nomeAluno?: string = '';

  @ApiProperty({ description: 'Idade do aluno ' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.ALUNO)
  @Type(() => Number)
  @IsInt({ message: 'A idade do aluno deve ser informada ' })
  idade?: number = 0;

  @ApiProperty({ description: 'Código de identificação do professor ' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.PROFESSOR)
  @Type(() => Number)
  @IsInt({ message: 'O código do professor deve ser informado ' })
  idProfessor?: number = 0;

  @ApiProperty({ description: 'Nome do professor ' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.PROFESSOR)
  @IsString({ message: 'O nome do professor deve ser informado ' })
  @IsNotEmpty({ message: 'O nome do professor é obrigatório ' })
  nomeProfessor?: string = '';

  @ApiProperty({ description: 'Código do professor ' })
  @ValidateIf((o) => o.tipo === TIPO_USUARIO.PROFESSOR)
  @IsString({ message: 'Informe o código do professor ' })
  @IsNotEmpty({ message: 'O código do professor é obrigatório ' })
  codProfessor?: string = '';

  constructor(data: Partial<UsuarioRequest> = {}) {
    Object.assign(this, data);
  }
}
