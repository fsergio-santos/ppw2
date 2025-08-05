import { Auth } from 'src/auth/entities/auth.entity';
import { LoginRequest } from '../request/auth.request';
import { LoginResponse } from '../response/login.response';
import { plainToInstance } from 'class-transformer';
import { RegisterUsuarioRequest } from '../request/register.usuario.request';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class ConverterAuth {
  static toAuth(loginRequest: LoginRequest): Auth | null {
    const auth = new Auth();
    auth.email = loginRequest.email ?? '';
    return auth;
  }

  static toLoginResponse(auth: Auth): LoginResponse {
    return plainToInstance(LoginResponse, auth, { excludeExtraneousValues: true });
  }

  static toUsuario(registerUsuarioRequest: RegisterUsuarioRequest): Usuario | null {
    return new Usuario({
      nomeUsuario: registerUsuarioRequest.nomeUsuario,
      email: registerUsuarioRequest.email,
      senha: registerUsuarioRequest.senha,
    });
  }
}
