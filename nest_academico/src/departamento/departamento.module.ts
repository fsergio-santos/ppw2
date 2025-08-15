import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoControllerCreate } from './controllers/departamento.controller.create';
import { DepartamentoControllerFindAll } from './controllers/departamento.controller.findall';
import { Departamento } from './entities/departamento.entity';
import { DepartamentoServiceCreate } from './services/departamento.service.create';
import { DepartamentoServiceFindAll } from './services/departamento.service.findall';

const departamentoControllers = [DepartamentoControllerCreate, DepartamentoControllerFindAll];

const departamentoServices = [DepartamentoServiceCreate, DepartamentoServiceFindAll];

@Module({
  imports: [TypeOrmModule.forFeature([Departamento])],
  providers: [...departamentoServices],
  controllers: [...departamentoControllers],
  exports: [TypeOrmModule, ...departamentoServices],
})
export class DepartamentoModule {}
