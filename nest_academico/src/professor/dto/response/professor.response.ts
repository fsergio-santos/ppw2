import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProfessorResponse {
  @ApiProperty({ description: 'Código de identificação do professor ' })
  @Expose()
  idProfessor?: number = 0;

  @ApiProperty({ description: 'Código do professor ' })
  @Expose()
  codProfessor?: string = '';

  @ApiProperty({ description: 'Nome do professor ' })
  @Expose()
  nomeProfessor?: string = '';

  @ApiProperty({ description: 'Código do usuário ' })
  @Expose()
  idUsuario?: number = 0;

  @ApiProperty({ description: 'Código do usuário ' })
  @Expose()
  codUsuario?: string = '';

  @ApiProperty({ description: 'Nome do usuário ' })
  @Expose()
  nomeUsuario?: string = '';

  @ApiProperty({ description: 'Email do usuário ' })
  @Expose()
  email?: string = '';

  @ApiProperty({ description: 'Nome da Cidade ' })
  @Expose()
  nomeCidade?: string = '';

  constructor(data: Partial<ProfessorResponse> = {}) {
    Object.assign(this, data);
  }
}
