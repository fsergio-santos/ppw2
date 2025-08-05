import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CidadeRequest {
  @Type(() => Number)
  @IsOptional()
  idCidade?: number;

  @ApiProperty({ description: 'Código da identificação da cidade ', example: 'COD120' })
  @IsNotEmpty({ message: 'O código da cidade deve ser informado ' })
  @IsString()
  @MaxLength(20, {
    message: 'O tamanho máximo é de 20 caracteres para o código do cidade',
  })
  codCidade?: string = '';

  @ApiProperty({ description: 'Nome da cidade ', example: 'Birigui' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o nome da cidade',
  })
  @IsNotEmpty({ message: 'O nome da cidade deve ser informado ' })
  @IsString()
  nomeCidade?: string = '';

  constructor(data: Partial<CidadeRequest> = {}) {
    Object.assign(this, data);
  }
}
