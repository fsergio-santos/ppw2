import { SetMetadata } from '@nestjs/common';
import { RoleRequirement, ROLES_KEY } from '../guards/acesso.guard';

export const UseRoles = (...requeriments: RoleRequirement[]) => SetMetadata(ROLES_KEY, requeriments);
