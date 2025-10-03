import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CIDADE } from '../../../cidade/constants/cidade.constants';
import { USUARIO } from '../../../usuario/constants/usuario.constants';
import { PROFESSOR } from '../../constants/professor.constants';

export class ProfessorResponse {
  @ApiProperty({ description: PROFESSOR.SWAGGER.ID, example: '1' })
  @Expose()
  idProfessor?: number = 0;

  @ApiProperty({ description: PROFESSOR.SWAGGER.CODIGO, example: 'COD120' })
  @Expose()
  codProfessor?: string = '';

  @ApiProperty({ description: PROFESSOR.SWAGGER.NOME, example: 'Antônio da Silva' })
  @Expose()
  nomeProfessor?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.ID, example: '1' })
  @Expose()
  idUsuario?: number = 0;

  @ApiProperty({ description: USUARIO.SWAGGER.CODPROFESSOR, example: 'COD121' })
  @Expose()
  codUsuario?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.NOME, example: 'Antônio da Silva' })
  @Expose()
  nomeUsuario?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.EMAIL, example: 'antonio@gmail.com' })
  @Expose()
  email?: string = '';

  @ApiProperty({ description: CIDADE.SWAGGER.NOME, example: 'Birigui' })
  @Expose()
  nomeCidade?: string = '';

  @ApiProperty({ description: USUARIO.SWAGGER.FOTO })
  @Expose()
  foto?: string = '';

  constructor(data: Partial<ProfessorResponse> = {}) {
    Object.assign(this, data);
  }
}
