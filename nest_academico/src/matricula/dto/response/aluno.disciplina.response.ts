import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MATRICULA } from 'src/matricula/constants/alunodisciplina.constants';

export class MatriculaResponse {
  @ApiProperty({ description: MATRICULA.SWAGGER.ALUNO_ID, example: '1' })
  @Expose()
  alunoId: number = 0;
  @ApiProperty({ description: MATRICULA.SWAGGER.ALUNO_NOME, example: 'Antônio da Silva' })
  @Expose()
  alunoNome?: string = '';
  @ApiProperty({ description: MATRICULA.SWAGGER.DISCIPLINA_ID, example: '1' })
  @Expose()
  disciplinaId?: number = 0;
  @ApiProperty({ description: MATRICULA.SWAGGER.DISCIPLINA_NOME, example: 'CÁLCULO DIFERENCIAL E INTEGRAL' })
  @Expose()
  disciplinaNome?: string = '';
  @ApiProperty({ description: MATRICULA.SWAGGER.PERIODO, example: '1' })
  @Expose()
  periodo?: number = 0;
}
