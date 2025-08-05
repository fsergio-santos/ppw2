import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CidadeResponse {
  @ApiProperty({ description: 'Código de identificação da cidade ' })
  @Expose()
  idCidade?: number = 0;

  @ApiProperty({ description: 'Código da cidade ' })
  @Expose()
  codCidade?: string = '';

  @ApiProperty({ description: 'Nome da cidade ' })
  @Expose()
  nomeCidade?: string = '';

  constructor(data: Partial<CidadeResponse> = {}) {
    Object.assign(this, data);
  }
}
