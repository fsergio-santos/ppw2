import { plainToInstance } from 'class-transformer';
import { AlunoDisciplina } from '../../entity/aluno.disciplina.entity';
import { AlunoDisciplinaRequest } from '../request/aluno.disciplina.request';
import { AlunoDisciplinaResponse } from '../response/aluno.disciplina.response';

export class ConverterAlunoDisciplina {
  public static toAlunoDisciplina(request: AlunoDisciplinaRequest): AlunoDisciplina {
    const alunoDisciplina = new AlunoDisciplina();
    alunoDisciplina.alunoId = request.alunoId;
    alunoDisciplina.disciplinaId = request.disciplinaId;
    return alunoDisciplina;
  }

  public static toAlunoDisciplinaResponse(alunoDisciplina: AlunoDisciplina): AlunoDisciplinaResponse {
    return plainToInstance(AlunoDisciplinaResponse, alunoDisciplina, { excludeExtraneousValues: true });
  }

  public static toAlunoDisciplinaResponseList(alunoDisciplina: AlunoDisciplina[]): AlunoDisciplinaResponse[] {
    return plainToInstance(AlunoDisciplinaResponse, alunoDisciplina, { excludeExtraneousValues: true });
  }
}
