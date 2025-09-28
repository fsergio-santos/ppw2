import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { MATRICULA } from '../../constants/alunodisciplina.constants';

export class AlunoDisciplinaRequest {
  @ApiProperty({ description: MATRICULA.SWAGGER.ALUNO_ID, example: '1' })
  @IsNumber({}, { message: MATRICULA.INPUT_ERROR.ALUNO_ID.NUMBER })
  @IsNotEmpty({ message: MATRICULA.INPUT_ERROR.ALUNO_ID.VALID })
  alunoId: number = 0;

  @ApiProperty({ description: MATRICULA.SWAGGER.DISCIPLINA_ID, example: '1' })
  @IsNumber({}, { message: MATRICULA.INPUT_ERROR.DISCIPLINA_ID.NUMBER })
  @IsNotEmpty({ message: MATRICULA.INPUT_ERROR.DISCIPLINA_ID.VALID })
  disciplinaId: number = 0;
}
