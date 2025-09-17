import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from '../entities/permission.entity';
import { Action, FunctionRoles, GrantMethod, Possession } from '../roles-builder/roles.builder';

function getMetodo(action: Action, possession: Possession): GrantMethod {
  const map = {
    [Action.CREATE]: {
      [Possession.OWN]: FunctionRoles.CREATEOWN,
      [Possession.ANY]: FunctionRoles.CREATEANY,
    },
    [Action.READ]: {
      [Possession.OWN]: FunctionRoles.READOWN,
      [Possession.ANY]: FunctionRoles.READANY,
    },
    [Action.UPDATE]: {
      [Possession.OWN]: FunctionRoles.UPDADEOWN,
      [Possession.ANY]: FunctionRoles.UPDATEANY,
    },
    [Action.DELETE]: {
      [Possession.OWN]: FunctionRoles.DELETEOWN,
      [Possession.ANY]: FunctionRoles.DELETEANY,
    },
    [Action.VIEW]: {
      [Possession.OWN]: FunctionRoles.VIEWOWN,
      [Possession.ANY]: FunctionRoles.VIEWANY,
    },
  } as const;
  return map[action][possession];
}

@Injectable()
export class LoadRoleService {
  constructor(
    @InjectRepository(Permissions) private readonly permissionsRepository: Repository<Permissions>,
  ) {}

  // async getRolePermissions(): Promise<RolesBuilder> {
  //   const permissions = await this.permissionsRepository
  //     .createQueryBuilder('permission')
  //     .leftJoinAndSelect('permission.role', 'role')
  //     .leftJoinAndSelect('permission.resource', 'resource')
  //     .getMany();

  //   const rolesBuilder = new RolesBuilder();
  //   permissions.forEach((p) => {
  //     const metodo = getMetodo(p.action as Action, p.possession as Possession);

  //     (rolesBuilder.grant(p.role.nomeRole)[metodo] as (resource: string, attrs?: string[]) => RolesBuilder)(
  //       p.resource.nomeResource,
  //       p.attributes ? p.attributes.split(',').map((attr) => attr.trim()) : ['*'],
  //     );
  //   });
  //   return rolesBuilder;
  // }
}
