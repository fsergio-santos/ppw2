import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { UsuarioRequest } from 'src/usuario/dto/request/usuario.request';

export class AlunoRequest {
  @Type(() => Number)
  @IsOptional()
  idAluno?: number = 0;

  @ApiProperty({ description: 'Código da identificação do aluno ', example: 'COD120' })
  @IsNotEmpty({ message: 'O código do aluno deve ser informado ' })
  @IsString()
  @MaxLength(20, {
    message: 'O tamanho máximo é de 20 caracteres para o código do aluno',
  })
  codAluno: string = '';

  @ApiProperty({ description: 'Código da identificação do aluno ', example: 'Luis Carlos da Silva' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o nome do aluno',
  })
  @IsNotEmpty({ message: 'O nome do do aluno deve ser informado ' })
  @IsString()
  nomeAluno: string = '';

  @ApiProperty({ description: 'Idade do aluno ', example: '20' })
  @IsInt({ message: 'informe a idade do aluno' })
  idade: number = 0;

  @ApiProperty({ description: 'Código do usuário ', example: '1' })
  @IsInt({ message: 'informe o código do usuário' })
  idUsuario?: number = 0;

  @ValidateNested()
  @Type(() => UsuarioRequest)
  usuario!: UsuarioRequest;

  constructor(data: Partial<AlunoRequest> = {}) {
    Object.assign(this, data);
  }
}
