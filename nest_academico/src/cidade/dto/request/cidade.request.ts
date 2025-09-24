import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CIDADE } from '../../constants/cidade.constants';

export class CidadeRequest {
  @ApiProperty({ description: CIDADE.SWAGGER.ID, example: '1' })
  @Type(() => Number)
  @IsOptional()
  idCidade?: number;

  @ApiProperty({ description: CIDADE.SWAGGER.CODIGO, example: 'COD120' })
  @IsNotEmpty({ message: CIDADE.INPUT_ERROR.CODIGO.TXT })
  @IsString()
  @MaxLength(20, {
    message: `${CIDADE.INPUT_ERROR.CODIGO.LEN} 20 caracteres `,
  })
  codCidade?: string = '';

  @ApiProperty({ description: CIDADE.SWAGGER.NOME, example: 'Birigui' })
  @MaxLength(100, {
    message: `${CIDADE.INPUT_ERROR.NOME.LEN} 100 caracteres `,
  })
  @IsNotEmpty({ message: CIDADE.INPUT_ERROR.NOME.TXT })
  @IsString()
  nomeCidade?: string = '';

  constructor(data: Partial<CidadeRequest> = {}) {
    Object.assign(this, data);
  }
}
