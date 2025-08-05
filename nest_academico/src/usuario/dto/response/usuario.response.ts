import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UsuarioResponse {
  @Expose()
  idUsuario?: number;

  @ApiProperty({ description: 'Código usuário ' })
  @Expose()
  codUsuario?: string;

  @ApiProperty({ description: 'Nome do usuário ' })
  @Expose()
  nomeUsuario?: string;

  @ApiProperty({ description: 'E-mail do usuário ' })
  @Expose()
  email?: string;

  @ApiProperty({ description: 'Foto do usuário ' })
  @Expose()
  foto?: string;

  @ApiProperty({ description: 'Tipo do usuário 1-Professor, 2-Aluno ' })
  @Expose()
  tipo?: number;

  @ApiProperty({ description: 'Usuário liberado para acesso ao sistema ' })
  @Expose()
  ativo?: boolean;

  @ApiProperty({ description: 'Código da cidade ' })
  @Expose()
  @Transform(({ obj }): number | undefined => obj.cidade?.idCidade)
  idCidade?: number;

  @ApiProperty({ description: 'Nome da cidade ' })
  @Expose()
  @Transform(({ obj }): string => obj.cidade?.nomeCidade ?? '')
  nomeCidade?: string;

  @ApiProperty({ description: 'Código de identificação do aluno  ' })
  @Expose()
  @Transform(({ obj }): number | undefined => obj.aluno?.idAluno)
  idAluno?: number;

  @ApiProperty({ description: 'Código do aluno ' })
  @Expose()
  @Transform(({ obj }): string => obj.aluno?.codAluno ?? '')
  codAluno?: string;

  @ApiProperty({ description: 'Nome do aluno ' })
  @Expose()
  @Transform(({ obj }): string => obj.aluno?.nomeAluno ?? '')
  nomeAluno?: string;

  @ApiProperty({ description: 'Idade do aluno ' })
  @Expose()
  @Transform(({ obj }): number | undefined => obj.aluno?.idade)
  idade?: number;

  @ApiProperty({ description: 'Código de identificação do professor ' })
  @Expose()
  @Transform(({ obj }): number | undefined => obj.professor?.idProfessor)
  idProfessor?: number;

  @ApiProperty({ description: 'Código do professor ' })
  @Expose()
  @Transform(({ obj }): string => obj.professor?.codProfessor ?? '')
  codProfessor?: string;

  @ApiProperty({ description: 'Nome do professor ' })
  @Expose()
  @Transform(({ obj }): string => obj.professor?.nomeProfessor ?? '')
  nomeProfessor?: string;

  constructor(data: Partial<UsuarioResponse> = {}) {
    Object.assign(this, data);
  }
}
