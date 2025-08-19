import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Role } from '../../../acesso/entities/role.entity';

export class LoginResponse {
  @Expose()
  @ApiProperty({ description: 'E-mail de identificação do usuário ' })
  email: string = '';

  @Expose()
  @ApiProperty({ description: 'Nome do usuário ' })
  nome: string = '';

  @Expose()
  @ApiProperty({ description: 'Roles do usuário ' })
  roles!: Role[];

  accessToken: string = '';

  refreshToken: string = '';

  expiresIn: number = Date.now();

  refreshExpiresIn: number = Date.now();
}
