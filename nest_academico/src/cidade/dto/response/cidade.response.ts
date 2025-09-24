import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CIDADE } from '../../constants/cidade.constants';

export class CidadeResponse {
  @ApiProperty({ description: CIDADE.SWAGGER.ID, example: '1' })
  @Expose()
  idCidade?: number = 0;

  @ApiProperty({ description: CIDADE.SWAGGER.CODIGO, example: 'COD101' })
  @Expose()
  codCidade?: string = '';

  @ApiProperty({ description: CIDADE.SWAGGER.NOME, example: 'Antônio da Silva' })
  @Expose()
  nomeCidade?: string = '';

  constructor(data: Partial<CidadeResponse> = {}) {
    Object.assign(this, data);
  }
}
