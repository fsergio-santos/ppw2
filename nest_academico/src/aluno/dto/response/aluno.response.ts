import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CIDADE } from '../../../cidade/constants/cidade.constants';
import { USUARIO } from '../../../usuario/constants/usuario.constants';
import { ALUNO } from '../../constants/aluno.constants';

export class AlunoResponse {
  @ApiProperty({ description: ALUNO.SWAGGER.ID, example: '1' })
  @Expose()
  idAluno?: number = 0;

  @ApiProperty({ description: ALUNO.SWAGGER.CODIGO, example: 'COD120' })
  @Expose()
  codAluno?: string = '';

  @ApiProperty({ description: ALUNO.SWAGGER.NOME, example: 'Antônio da Silva' })
  @Expose()
  nomeAluno?: string = '';

  @ApiProperty({ description: ALUNO.SWAGGER.IDADE, example: '22' })
  @Expose()
  idade?: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.ID, example: '1' })
  @Expose()
  idUsuario?: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.NOME, example: 'Antônio da Silva' })
  @Expose()
  nomeUsuario?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.CODPROFESSOR, example: 'COD121' })
  @Expose()
  codUsuario?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.EMAIL, example: 'antonio@gmail.com' })
  @Expose()
  email?: string = '';

  @ApiProperty({ description: CIDADE.SWAGGER.NOME, example: 'Birigui' })
  @Expose()
  nomeCidade?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.FOTO })
  @Expose()
  foto?: string = '';

  constructor(data: Partial<AlunoResponse> = {}) {
    Object.assign(this, data);
  }
}
