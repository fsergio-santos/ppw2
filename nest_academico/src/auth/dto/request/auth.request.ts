import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ description: 'E-mail do usuário ' })
  @IsString()
  @IsEmail({}, { message: 'Informe o endereço de e-mail válido ' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 255 caracteres para o e-mail',
  })
  email: string = '';

  @ApiProperty({ description: 'Senha do usuário ' })
  @IsString()
  senha: string = '';
}
