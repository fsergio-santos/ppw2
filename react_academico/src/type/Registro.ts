import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';

export interface Registro {
  nomeUsuario: string;
  email: string;
  senha: string;
  confirmSenha: string;
}

export const camposObrigatoriosDoRegistro = ['nomeUsuario', 'email', 'senha', 'confirmSenha'] as (keyof Registro)[];

export const mensagensCamposObrigatoriosDoRegistro: Partial<Record<keyof Registro, string>> = {
  nomeUsuario: MENSAGEMS_VALIDACAO.NOME_USUARIO.blank,
  email: MENSAGEMS_VALIDACAO.EMAIL.valid,
  senha: MENSAGEMS_VALIDACAO.SENHA.valid,
  confirmSenha: MENSAGEMS_VALIDACAO.CONFIRM_SENHA.valid,
};
