import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { tratarErroBanco } from 'src/commons/banco/error.database';
import { ConverterDepartamento } from '../dto/converter/departamento.converter';
import { DepartamentoRequest } from '../dto/request/departamento.request';
import { DepartamentoResponse } from '../dto/response/departamento.response';
import { Departamento } from '../entities/departamento.entity';

@Injectable()
export class DepartamentoServiceCreate {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  async create(departamentoRequest: DepartamentoRequest): Promise<DepartamentoResponse> {
    try {
      let departamento = ConverterDepartamento.toDepartamento(departamentoRequest);
      departamento = await this.departamentoRepository.save(departamento);
      return ConverterDepartamento.toDepartamentoResponse(departamento);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}
