import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DepartamentoResponse {
  @ApiProperty({ description: 'Código de identificação da Departamento ' })
  @Expose()
  idDepartamento?: number = 0;

  @ApiProperty({ description: 'Código da Departamento ' })
  @Expose()
  codDepartamento?: string = '';

  @ApiProperty({ description: 'Nome da Departamento ' })
  @Expose()
  nomeDepartamento?: string = '';

  constructor(data: Partial<DepartamentoResponse> = {}) {
    Object.assign(this, data);
  }
}
