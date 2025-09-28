import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from '../professor/entities/professor.entity';
import { DisciplinaControllerCreate } from './controllers/disciplina.controller.create';
import { DisciplinaControllerFindAll } from './controllers/disciplina.controller.findall';
import { DisciplinaControllerFindOne } from './controllers/disciplina.controller.findone';
import { DisciplinaControllerRemove } from './controllers/disciplina.controller.remove';
import { DisciplinaControllerUpdate } from './controllers/disciplina.controller.update';
import { Disciplina } from './entities/disciplina.entity';
import { DisciplinaServiceCount } from './service/disciplina.service.count';
import { DisciplinaServiceCreate } from './service/disciplina.service.create';
import { DisciplinaServiceFindAll } from './service/disciplina.service.findall';
import { DisciplinaServiceFindOne } from './service/disciplina.service.findone';
import { DisciplinaServiceRemove } from './service/disciplina.service.remove';
import { DisciplinaServiceUpdate } from './service/disciplina.service.update';

const disciplinaControllers = [
  DisciplinaControllerCreate,
  DisciplinaControllerFindAll,
  DisciplinaControllerFindOne,
  DisciplinaControllerRemove,
  DisciplinaControllerUpdate,
];

const disciplinaServices = [
  DisciplinaServiceCreate,
  DisciplinaServiceFindAll,
  DisciplinaServiceFindOne,
  DisciplinaServiceRemove,
  DisciplinaServiceUpdate,
  DisciplinaServiceCount,
];

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina, Professor])],
  controllers: [...disciplinaControllers],
  providers: [...disciplinaServices],
  exports: [TypeOrmModule, ...disciplinaServices],
})
export class DisciplinaModule {}
