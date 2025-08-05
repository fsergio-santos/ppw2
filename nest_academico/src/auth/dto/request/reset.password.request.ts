import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordRequest {
  @ApiProperty({ description: 'Senha do usuário ' })
  @IsString()
  senha: string = '';

  @ApiProperty({ description: 'Token para validação da transação' })
  @IsString()
  token: string = '';
}
