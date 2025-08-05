import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, Validate } from 'class-validator';
import { MatchPasswordConstraint } from 'src/commons/validation/match-password.constraint';

export class RegisterUsuarioRequest {
  @ApiProperty({ description: 'Nome do usuário ' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o nome do usuário',
  })
  @IsNotEmpty({ message: 'O código do usuário deve ser informado ' })
  @IsString()
  nomeUsuario: string = '';

  @ApiProperty({ description: 'E-mail do usuário ' })
  @IsString()
  @IsEmail({}, { message: 'Informe o endereço de e-mail válido ' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 255 caracteres para o e-mail',
  })
  email: string = '';

  @ApiProperty({ description: 'Senha do usuário ' })
  @IsString()
  // @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/, {
  //   message:
  //     'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  // })
  senha: string = '';

  @ApiProperty({ description: 'Confirmar a senha do usuário' })
  @IsString()
  // @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/, {
  //   message:
  //     'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  // })
  @Validate(MatchPasswordConstraint)
  confirmSenha: string = 'Senha do usuário ';

  constructor(data: Partial<RegisterUsuarioRequest> = {}) {
    Object.assign(this, data);
  }
}
