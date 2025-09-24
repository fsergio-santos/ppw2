import { plainToInstance } from 'class-transformer';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { DisciplinaRequest } from '../request/disciplina.request';
import { DisciplinaResponse } from '../response/disciplina.response';

export class ConverterDisciplina {
  static toDisciplina(disciplinaRequest: DisciplinaRequest): Disciplina {
    const disciplina = new Disciplina();

    if (disciplinaRequest.idDisciplina != null) {
      disciplina.idDisciplina = disciplinaRequest.idDisciplina;
    }

    disciplina.periodo = disciplinaRequest.periodo;
    disciplina.nomeDisciplina = disciplinaRequest.nomeDisciplina;

    return disciplina;
  }

  static toListDisciplinaResponse(disciplina: Disciplina[] = []): DisciplinaResponse[] {
    return plainToInstance(DisciplinaResponse, disciplina, { excludeExtraneousValues: true });
  }

  static toDisciplinaResponse(disciplina: Disciplina): DisciplinaResponse {
    return plainToInstance(DisciplinaResponse, disciplina, { excludeExtraneousValues: true });
  }
}
