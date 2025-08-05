import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';

export interface Professor {
  idUsuario: string;
  codUsuario: string;
  nomeUsuario: string;
  email: string;
  senha: string;
  confirmSenha: string;
  idCidade: string;
  nomeCidade: string;
  idProfessor: string;
  codProfessor: string;
  nomeProfessor: string;
  foto: string;
  contentType: string;
}

export const camposObrigatoriosDoProfessor = [
  'idUsuario',
  'codUsuario',
  'nomeUsuario',
  'email',
  'senha',
  'confirmSenha',
  'idCidade',
  'nomeCidade',
  'idProfessor',
  'codProfessor',
  'nomeProfessor',
] as (keyof Professor)[];

export const mensagensCamposObrigatoriosDoProfessor: Partial<Record<keyof Professor, string>> = {
  idUsuario: MENSAGEMS_VALIDACAO.ID.blank,
  codUsuario: MENSAGEMS_VALIDACAO.CODIGO_USUARIO.valid,
  nomeUsuario: MENSAGEMS_VALIDACAO.NOME_USUARIO.blank,
  email: MENSAGEMS_VALIDACAO.EMAIL.valid,
  senha: MENSAGEMS_VALIDACAO.SENHA.valid,
  confirmSenha: MENSAGEMS_VALIDACAO.CONFIRM_SENHA.valid,
  idCidade: MENSAGEMS_VALIDACAO.ID.blank,
  nomeCidade: MENSAGEMS_VALIDACAO.NOME_CIDADE.blank,
  idProfessor: MENSAGEMS_VALIDACAO.ID.blank,
  codProfessor: MENSAGEMS_VALIDACAO.CODIGO_PROFESSOR.valid,
  nomeProfessor: MENSAGEMS_VALIDACAO.NOME_PROFESSOR.blank,
};
