import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcessoController } from './controllers/acesso.controller';
import { Permissions } from './entities/permission.entity';
import { Resource } from './entities/resource.entity';
import { Role } from './entities/role.entity';
import { RolesBuilder } from './roles-builder/roles.builder';
import { AcessoControleService } from './service/acesso.controle.service';
import { AcessoService } from './service/acesso.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role, Resource, Permissions])],
  providers: [AcessoService],
  controllers: [AcessoController],
  exports: [AcessoService],
})
export class AcessoModule {
  static forRoles(roles: RolesBuilder): DynamicModule {
    return {
      module: AcessoModule,
      providers: [
        {
          provide: RolesBuilder,
          useValue: roles,
        },
        AcessoControleService,
      ],
      exports: [RolesBuilder, AcessoControleService],
    };
  }
}
