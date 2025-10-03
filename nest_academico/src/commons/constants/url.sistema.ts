import { ALUNO } from '../../aluno/constants/aluno.constants';
import { CIDADE } from '../../cidade/constants/cidade.constants';
import { DISCIPLINA } from '../../disciplina/constants/disciplina.constants';
import { MATRICULA } from '../../matricula/constants/alunodisciplina.constants';
import { USUARIO } from '../../usuario/constants/usuario.constants';
import { PROFESSOR } from './constants.sistema';

export const SERVIDOR = 'http://localhost:8000';
export const CLIENTE = 'http://localhost:3000';

const ROTA_SISTEMA = 'rest/sistema';
const ROTA_AUT = 'rest/auth';

const LISTAR = `listar`;
const CRIAR = `criar`;
const POR_ID = `buscar`;
const ATUALIZAR = `alterar`;
const EXCLUIR = `excluir`;

function gerarRotasSistema(entity: string) {
  const base = `/${ROTA_SISTEMA}/${entity}`;
  return {
    BASE: base,
    LISTAR: `/${LISTAR}`,
    CRIAR: `/${CRIAR}`,
    POR_ID: `/${POR_ID}/:id`,
    ATUALIZAR: `/${ATUALIZAR}/:id`,
    EXCLUIR: `/${EXCLUIR}/:id`,
  };
}

const LOGIN = 'login';
const LOGOUT = 'logout';
const PROFILE = 'profile';
const REFRESH_TOKEN = 'refresh-token';
const CHANGE_PASSWORD = 'change-password';
const REGISTER = 'register';
const FORGOT_PASSWORD = 'forgot-password';
const RESET_PASSWORD = 'reset-password';

function gerarRotasAuth() {
  const base = `${ROTA_AUT}`;
  return {
    BASE: base,
    LOGIN: `/${LOGIN}`,
    LOGOUT: `/${LOGOUT}`,
    PROFILE: `/${PROFILE}`,
    REFRESH_TOKEN: `/${REFRESH_TOKEN}`,
    CHANGE_PASSWORD: `/${CHANGE_PASSWORD}`,
    REGISTER: `/${REGISTER}`,
    FORGOT_PASSWORD: `/${FORGOT_PASSWORD}`,
    RESET_PASSWORD: `/${RESET_PASSWORD}`,
  };
}

export const ROTA = {
  USUARIO: gerarRotasSistema(USUARIO.ALIAS),
  PROFESSOR: gerarRotasSistema(PROFESSOR),
  CIDADE: gerarRotasSistema(CIDADE.ALIAS),
  ALUNO: gerarRotasSistema(ALUNO.ALIAS),
  DISCIPLINA: gerarRotasSistema(DISCIPLINA.ALIAS),
  MATRICULA: gerarRotasSistema(MATRICULA.ALIAS),
};

export const ROTA_AUTH = gerarRotasAuth();
