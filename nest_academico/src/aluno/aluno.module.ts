import { Module } from '@nestjs/common';
import { Aluno } from './entities/aluno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AlunoServiceCreate } from './service/aluno.service.create';
import { AlunoServiceFindAll } from './service/aluno.service.findall';
import { AlunoServiceFindOne } from './service/aluno.service.findone';
import { AlunoServiceRemove } from './service/aluno.service.remove';
import { AlunoServiceUpdate } from './service/aluno.service.update';
import { AlunoControllerCreate } from './controllers/aluno.controller.create';
import { AlunoControllerFindOne } from './controllers/aluno.controller.findone';
import { AlunoControllerRemove } from './controllers/aluno.controller.remove';
import { AlunoControllerUpdate } from './controllers/aluno.controller.update';
import { AlunoControllerFindAll } from './controllers/aluno.controller.findall';

const alunoControllers = [
  AlunoControllerCreate,
  AlunoControllerFindAll,
  AlunoControllerFindOne,
  AlunoControllerRemove,
  AlunoControllerUpdate,
];

const alunoServices = [
  AlunoServiceCreate,
  AlunoServiceFindAll,
  AlunoServiceFindOne,
  AlunoServiceRemove,
  AlunoServiceUpdate,
];

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Usuario])],
  controllers: [...alunoControllers],
  providers: [...alunoServices],
  exports: [TypeOrmModule, ...alunoServices],
})
export class AlunoModule {}
