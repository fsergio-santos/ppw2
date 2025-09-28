import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { USUARIO } from '../../constants/usuario.constants';

export class UsuarioResponse {
  @ApiProperty({ description: USUARIO.SWAGGER.ID, example: '1' })
  @Expose()
  idUsuario?: number;

  @ApiProperty({ description: USUARIO.SWAGGER.CODUSUARIO, example: 'COD120' })
  @Expose()
  codUsuario?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.NOME, example: 'Antônio da Silva' })
  @Expose()
  nomeUsuario?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.EMAIL, example: 'antonio@dominio.com.br' })
  @Expose()
  email?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.FOTO })
  @Expose()
  foto?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.TIPO, example: '1' })
  @Expose()
  tipo?: number;

  @ApiProperty({ description: 'Usuário liberado para acesso ao sistema ' })
  @Expose()
  ativo?: boolean;

  @ApiProperty({ description: USUARIO.SWAGGER.IDCIDADE, example: '1' })
  @Expose()
  @Transform(({ obj }): number | undefined => obj.cidade?.idCidade)
  idCidade?: number;

  @ApiProperty({ description: USUARIO.SWAGGER.NOMECIDADE, example: 'Birigui' })
  @Expose()
  @Transform(({ obj }): string => obj.cidade?.nomeCidade ?? '')
  nomeCidade?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.IDALUNO, example: '1' })
  @Expose()
  @Transform(({ obj }): number | undefined => obj.aluno?.idAluno)
  idAluno?: number;

  @ApiProperty({ description: USUARIO.SWAGGER.CODALUNO, example: 'COD121' })
  @Expose()
  @Transform(({ obj }): string => obj.aluno?.codAluno ?? '')
  codAluno?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.NOMEALUNO, example: 'Antônio da Silva' })
  @Expose()
  @Transform(({ obj }): string => obj.aluno?.nomeAluno ?? '')
  nomeAluno?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.IDADE, example: '21' })
  @Expose()
  @Transform(({ obj }): number | undefined => obj.aluno?.idade)
  idade?: number;

  @ApiProperty({ description: USUARIO.SWAGGER.IDPROFESSOR, example: '1' })
  @Expose()
  @Transform(({ obj }): number | undefined => obj.professor?.idProfessor)
  idProfessor?: number;

  @ApiProperty({ description: USUARIO.SWAGGER.CODPROFESSOR, example: 'COD121' })
  @Expose()
  @Transform(({ obj }): string => obj.professor?.codProfessor ?? '')
  codProfessor?: string;

  @ApiProperty({ description: USUARIO.SWAGGER.NOMEPROFESSOR, example: 'Antônio da Silva' })
  @Expose()
  @Transform(({ obj }): string => obj.professor?.nomeProfessor ?? '')
  nomeProfessor?: string;

  constructor(data: Partial<UsuarioResponse> = {}) {
    Object.assign(this, data);
  }
}
