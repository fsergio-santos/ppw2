import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcessoController } from './controllers/acesso.controller';
import { Permissions } from './entities/permission.entity';
import { Resource } from './entities/resource.entity';
import { Role } from './entities/role.entity';
import { RolesBuilder } from './roles-builder/roles.builder';

import { AcessoControleService } from './service/acesso.controle.service';
import { AcessoService } from './service/acesso.service';
import { LoadRoleService } from './service/load.role.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role, Resource, Permissions])],
  providers: [
    AcessoService,
    AcessoControleService,
    LoadRoleService,
    {
      provide: RolesBuilder,
      useFactory: async (loadRoleService: LoadRoleService): Promise<RolesBuilder | null> => {
        return null; //await loadRoleService.getRolePermissions();
      },
      inject: [LoadRoleService],
    },
  ],
  controllers: [AcessoController],
  exports: [AcessoService, RolesBuilder, AcessoControleService],
})
export class AcessoModule {}
