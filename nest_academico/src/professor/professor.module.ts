import { Module } from '@nestjs/common';
import { Professor } from './entities/professor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ProfessorServiceCreate } from './service/professor.service.create';
import { ProfessorServiceFindAll } from './service/professor.service.findlall';
import { ProfessorServiceFindOne } from './service/professor.service.findone';
import { ProfessorServiceRemove } from './service/professor.service.remove';
import { ProfessorServiceUpdate } from './service/professor.service.update';
import { ProfessorControllerCreate } from './controller/professor.controller.create';
import { ProfessorControllerFindAll } from './controller/professor.controller.findall';
import { ProfessorControllerFindOne } from './controller/professor.controller.findone';
import { ProfessorControllerRemove } from './controller/professor.controller.remove';
import { ProfessorControllerUpdate } from './controller/professor.controller.update';

const professorControllers = [
  ProfessorControllerCreate,
  ProfessorControllerFindAll,
  ProfessorControllerFindOne,
  ProfessorControllerRemove,
  ProfessorControllerUpdate,
];

const professorServices = [
  ProfessorServiceCreate,
  ProfessorServiceFindAll,
  ProfessorServiceFindOne,
  ProfessorServiceRemove,
  ProfessorServiceUpdate,
];

@Module({
  imports: [TypeOrmModule.forFeature([Professor, Usuario])],
  controllers: [...professorControllers],
  providers: [...professorServices],
  exports: [TypeOrmModule, ...professorServices],
})
export class ProfessorModule {}
