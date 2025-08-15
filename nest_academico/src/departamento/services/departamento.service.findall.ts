import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDepartamento } from '../dto/converter/departamento.converter';
import { DepartamentoResponse } from '../dto/response/departamento.response';
import { Departamento } from '../entities/departamento.entity';

@Injectable()
export class DepartamentoServiceFindAll {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  async findAll(): Promise<DepartamentoResponse[]> {
    const departamentos = await this.departamentoRepository.find();
    return ConverterDepartamento.toListDepartamentoResponse(departamentos);
  }
}
