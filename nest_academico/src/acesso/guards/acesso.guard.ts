import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Action, Possession } from '../roles-builder/roles.builder';
import { AcessoControleService } from '../service/acesso.controle.service';

export interface RoleRequirement {
  resource: string;
  action: Action;
  possession: Possession;
}

export const ROLES_KEY = 'roles';

@Injectable()
export class ControleAcessoGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly acessoControleService: AcessoControleService,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requirements = this.reflector.get<RoleRequirement[]>(ROLES_KEY, context.getHandler()) || [];

    if (!requirements.length) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user; // user.role deve estar no request (middleware/jwt)

    return requirements.every((req) =>
      this.acessoControleService.canAccess(user.role, req.action, req.possession, req.resource),
    );
  }
}
