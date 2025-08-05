import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';

export interface Aluno {
  idUsuario: string;
  codUsuario: string;
  nomeUsuario: string;
  email: string;
  senha: string;
  confirmSenha: string;
  idCidade: string;
  nomeCidade: string;
  idade: string;
  idAluno: string;
  codAluno: string;
  nomeAluno: string;
  foto: string;
  contentType: string;
}

export const camposObrigatoriosDoAluno = [
  'idUsuario',
  'codUsuario',
  'nomeUsuario',
  'email',
  'senha',
  'confirmSenha',
  'idCidade',
  'nomeCidade',
  'idade',
  'idAluno',
  'codAluno',
  'nomeAluno',
] as (keyof Aluno)[];

export const mensagensCamposObrigatoriosDoAluno: Partial<Record<keyof Aluno, string>> = {
  idUsuario: MENSAGEMS_VALIDACAO.ID.blank,
  codUsuario: MENSAGEMS_VALIDACAO.CODIGO_USUARIO.valid,
  nomeUsuario: MENSAGEMS_VALIDACAO.NOME_USUARIO.blank,
  email: MENSAGEMS_VALIDACAO.EMAIL.valid,
  senha: MENSAGEMS_VALIDACAO.SENHA.valid,
  confirmSenha: MENSAGEMS_VALIDACAO.CONFIRM_SENHA.valid,
  idCidade: MENSAGEMS_VALIDACAO.ID.blank,
  nomeCidade: MENSAGEMS_VALIDACAO.NOME_CIDADE.blank,
  idade: MENSAGEMS_VALIDACAO.IDADE.valid,
  idAluno: MENSAGEMS_VALIDACAO.ID.blank,
  codAluno: MENSAGEMS_VALIDACAO.CODIGO_ALUNO.valid,
  nomeAluno: MENSAGEMS_VALIDACAO.NOME_ALUNO.blank,
};
