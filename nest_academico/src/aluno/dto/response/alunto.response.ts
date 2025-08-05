import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AlunoResponse {
  @ApiProperty({ description: 'Código de identificação do aluno ' })
  @Expose()
  idAluno?: number = 0;

  @ApiProperty({ description: 'Código do aluno ' })
  @Expose()
  codAluno?: string = '';

  @ApiProperty({ description: 'Nome do aluno ' })
  @Expose()
  nomeAluno?: string = '';

  @ApiProperty({ description: 'Idade do aluno ' })
  @Expose()
  idade?: number = 0;

  @ApiProperty({ description: 'Código de identificação do usuário ' })
  @Expose()
  idUsuario?: number = 0;

  @ApiProperty({ description: 'Nome do usuário ' })
  @Expose()
  nomeUsuario?: string = '';

  constructor(data: Partial<AlunoResponse> = {}) {
    Object.assign(this, data);
  }
}
