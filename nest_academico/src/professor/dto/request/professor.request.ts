import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { UsuarioRequest } from 'src/usuario/dto/request/usuario.request';

export class ProfessorRequest {
  @Type(() => Number)
  @IsOptional()
  idProfessor?: number = 0;

  @ApiProperty({ description: 'Código da identificação do professor ', example: 'COD120' })
  @IsNotEmpty({ message: 'O código do professor deve ser informado ' })
  @IsString()
  @MaxLength(20, {
    message: 'O tamanho máximo é de 20 caracteres para o código do professor',
  })
  codProfessor?: string;
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o nome do professor',
  })
  @ApiProperty({ description: 'Nome do professor ', example: 'Luis Carlos da Silva' })
  @IsNotEmpty({ message: 'O código do professor deve ser informado ' })
  @IsString()
  nomeProfessor?: string;

  @ApiProperty({ description: 'Código do usuário ', example: '1' })
  @IsInt({ message: 'informe o código do usuário' })
  idUsuario?: number = 0;

  @ValidateNested()
  @Type(() => UsuarioRequest)
  usuario!: UsuarioRequest;

  constructor(data: Partial<ProfessorRequest> = {}) {
    Object.assign(this, data);
  }
}
