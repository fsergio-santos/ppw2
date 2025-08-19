import { Role } from '../../acesso/entities/role.entity';

export class Auth {
  email: string = '';
  nome: string = '';
  roles: Role[] = [];
  accessToken: string = '';
  refreshToken: string = '';
}
