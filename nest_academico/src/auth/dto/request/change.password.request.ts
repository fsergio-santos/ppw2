import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class ChangePasswordRequest {
  @Type(() => Number)
  idUsuario?: number = 0;

  @ApiProperty({ description: 'Senha do usuário ' })
  @IsString()
  novaSenha: string = '';

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  senhaAntiga: string = '';
}
