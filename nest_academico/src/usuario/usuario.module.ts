import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

import { AlunoModule } from 'src/aluno/aluno.module';
import { AuthModule } from 'src/auth/auth.module';
import { CidadeModule } from 'src/cidade/cidade.module';
import { Cidade } from 'src/cidade/entities/cidade.entity';
import { ProfessorModule } from 'src/professor/professor.module';
import { UsuarioControllerCreate } from './controller/usuario.controller.create';
import { UsuarioControllerFindAll } from './controller/usuario.controller.findall';
import { UsuarioControllerFindOne } from './controller/usuario.controller.findone';
import { UsuarioControllerRemove } from './controller/usuario.controller.remove';
import { UsuarioControllerUpdate } from './controller/usuario.controller.update';
import { UsuarioServiceCreate } from './service/usuario.service.create';
import { UsuarioServiceFindAll } from './service/usuario.service.findall';
import { UsuarioServiceFindEmail } from './service/usuario.service.findemail';
import { UsuarioServiceFindOne } from './service/usuario.service.findone';
import { UsuarioServiceRemove } from './service/usuario.service.remove';
import { UsuarioServiceUpdate } from './service/usuario.service.update';

const usuarioControllers = [
  UsuarioControllerCreate,
  UsuarioControllerFindAll,
  UsuarioControllerFindOne,
  UsuarioControllerRemove,
  UsuarioControllerUpdate,
];

const usuarioServices = [
  UsuarioServiceCreate,
  UsuarioServiceFindAll,
  UsuarioServiceFindOne,
  UsuarioServiceRemove,
  UsuarioServiceUpdate,
  UsuarioServiceFindEmail,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Cidade]),
    AlunoModule,
    ProfessorModule,
    forwardRef(() => CidadeModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [...usuarioControllers],
  providers: [...usuarioServices],
  exports: [TypeOrmModule, ...usuarioServices],
})
export class UsuarioModule {}
