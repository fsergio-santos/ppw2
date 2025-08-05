import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { CidadeControllerCreate } from './controller/cidade.controller.create';
import { CidadeControllerFindAll } from './controller/cidade.controller.findall';
import { CidadeControllerFindOne } from './controller/cidade.controller.findone';
import { CidadeControllerRemove } from './controller/cidade.controller.remove';
import { CidadeControllerUpdate } from './controller/cidade.controller.update';
import { Cidade } from './entities/cidade.entity';
import { CidadeServiceCreate } from './service/cidade.service.create';
import { CidadeServiceFindAll } from './service/cidade.service.findall';
import { CidadeServiceFindOne } from './service/cidade.service.findone';
import { CidadeServiceRemove } from './service/cidade.service.remove';
import { CidadeServiceUpdate } from './service/cidade.service.update';

const cidadeControllers = [
  CidadeControllerCreate,
  CidadeControllerFindAll,
  CidadeControllerFindOne,
  CidadeControllerRemove,
  CidadeControllerUpdate,
];

const cidadeServices = [
  CidadeServiceCreate,
  CidadeServiceFindAll,
  CidadeServiceFindOne,
  CidadeServiceRemove,
  CidadeServiceUpdate,
];

@Module({
  imports: [TypeOrmModule.forFeature([Cidade]), forwardRef(() => UsuarioModule), AuthModule],
  controllers: [...cidadeControllers],
  providers: [...cidadeServices],
  exports: [TypeOrmModule, ...cidadeServices],
})
export class CidadeModule {}
