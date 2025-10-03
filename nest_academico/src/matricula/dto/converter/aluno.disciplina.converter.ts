import { plainToInstance } from 'class-transformer';
import { Matricula } from '../../entity/aluno.disciplina.entity';
import { MatriculaRequest } from '../request/aluno.disciplina.request';
import { MatriculaResponse } from '../response/aluno.disciplina.response';

export class ConverterMatricula {
  public static toMatricula(request: MatriculaRequest): Matricula {
    const alunoDisciplina = new Matricula();
    alunoDisciplina.alunoId = request.alunoId;
    alunoDisciplina.disciplinaId = request.disciplinaId;
    return alunoDisciplina;
  }

  public static toMatriculaResponse(alunoDisciplina: Matricula): MatriculaResponse {
    return plainToInstance(MatriculaResponse, alunoDisciplina, { excludeExtraneousValues: true });
  }

  public static toListMatriculaResponse(alunoDisciplina: Matricula[]): MatriculaResponse[] {
    return plainToInstance(MatriculaResponse, alunoDisciplina, { excludeExtraneousValues: true });
  }
}
