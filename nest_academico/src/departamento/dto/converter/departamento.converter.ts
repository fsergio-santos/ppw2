import { plainToInstance } from 'class-transformer';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { DepartamentoRequest } from '../request/departamento.request';
import { DepartamentoResponse } from '../response/departamento.response';

export class ConverterDepartamento {
  static toDepartamento(departamentoRequest: DepartamentoRequest): Departamento {
    const departamento = new Departamento();
    departamento.idDepartamento = departamentoRequest.idDepartamento;
    departamento.codDepartamento = departamentoRequest.codDepartamento;
    departamento.nomeDepartamento = departamentoRequest.nomeDepartamento;

    return departamento;
  }

  static toListDepartamentoResponse(lista: Departamento[] = []): DepartamentoResponse[] {
    const departamentosDepartamento = lista.map((departamento) => ({
      idDepartamento: departamento.idDepartamento,
      codDepartamento: departamento.codDepartamento,
      nomeDepartamento: departamento.nomeDepartamento,
    }));
    return plainToInstance(DepartamentoResponse, departamentosDepartamento, { excludeExtraneousValues: true });
  }

  static toDepartamentoResponse(departamento: Departamento): DepartamentoResponse {
    const departamentoDepartamento = {
      idDepartamento: departamento.idDepartamento,
      codDepartamento: departamento.codDepartamento,
      nomeDepartamento: departamento.nomeDepartamento,
    };
    return plainToInstance(DepartamentoResponse, departamentoDepartamento, { excludeExtraneousValues: true });
  }
}
