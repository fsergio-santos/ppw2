import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class DepartamentoRequest {
  @Type(() => Number)
  @IsOptional()
  idDepartamento?: number;

  @ApiProperty({ description: 'Código da identificação do Departamento ', example: 'COD120' })
  @IsNotEmpty({ message: 'O código da Departamento deve ser informado ' })
  @IsString()
  @MaxLength(20, {
    message: 'O tamanho máximo é de 20 caracteres para o código do Departamento',
  })
  codDepartamento?: string = '';

  @ApiProperty({ description: 'Nome da Departamento ', example: 'Birigui' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o nome da Departamento',
  })
  @IsNotEmpty({ message: 'O nome da Departamento deve ser informado ' })
  @IsString()
  nomeDepartamento?: string = '';

  constructor(data: Partial<DepartamentoRequest> = {}) {
    Object.assign(this, data);
  }
}
