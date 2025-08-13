import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoControllerCreate } from './controllers/departamento.controller.create';
import { Departamento } from './entities/departamento.entity';
import { DepartamentoServiceCreate } from './services/departamento.service.create';

const departamentoControllers = [DepartamentoControllerCreate];

const departamentoServices = [DepartamentoServiceCreate];

@Module({
  imports: [TypeOrmModule.forFeature([Departamento])],
  providers: [...departamentoServices],
  controllers: [...departamentoControllers],
  exports: [TypeOrmModule, ...departamentoServices],
})
export class DepartamentoModule {}
