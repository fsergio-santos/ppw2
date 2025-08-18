import { Injectable } from '@nestjs/common';
import { Action, Possession, RolesBuilder } from '../roles-builder/roles.builder';

@Injectable()
export class AcessoControleService {
  constructor(private readonly rolesBuilder: RolesBuilder) {}

  canAccess(role: string, action: Action, possession: Possession, resource: string) {
    return this.rolesBuilder.can(role, action, possession, resource);
  }
}
