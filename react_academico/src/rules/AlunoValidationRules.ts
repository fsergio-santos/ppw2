// /hooks/useValidarDadosUsuario.ts

import { useValidacao } from '../hook/useValidacao';
import { emailRegex } from '../service/constant/Constantes';
import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';
import type { Aluno } from '../type/Aluno';
import type { ValidationRules } from '../type/validation.types';

// 1. Defina o estado inicial para um novo usuário
const ALUNO_INICIAL: Aluno = {
  idUsuario: '',
  codUsuario: '',
  nomeUsuario: '',
  email: '',
  senha: '',
  confirmSenha: '',
  idCidade: '',
  nomeCidade: '',
  idade: '',
  idAluno: '',
  codAluno: '',
  nomeAluno: '',
  foto: '',
  contentType: '',
};

const usuarioValidationRules: ValidationRules<Aluno> = {
  codUsuario: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CODIGO_USUARIO.valid);
    }
    return errorMessages;
  },

  nomeUsuario: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length < 3) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_USUARIO.length);
    }
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_USUARIO.blank);
    }
    return errorMessages;
  },

  email: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.EMAIL.blank);
    }
    if (!emailRegex.test(value)) {
      errorMessages.push(MENSAGEMS_VALIDACAO.EMAIL.valid);
    }
    return errorMessages;
  },

  senha: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.SENHA.blank);
    }
    if (!value || value.length < 6) {
      errorMessages.push(MENSAGEMS_VALIDACAO.SENHA.length);
    }
    return errorMessages;
  },

  confirmSenha: (value, model) => {
    const errorMessages: string[] = [];
    if (value !== model.senha) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CONFIRM_SENHA.equals);
    }
    return errorMessages;
  },

  idCidade: (value) => {
    const errorMessages: string[] = [];
    if (!value || String(value).trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.ID.blank);
    }
    return errorMessages;
  },

  idade: (value) => {
    const errorMessages: string[] = [];
    if (!value || Number(value) <= 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.IDADE.valid);
    }
    return errorMessages;
  },

  idAluno: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim() === '') {
      errorMessages.push(MENSAGEMS_VALIDACAO.ID.blank);
    }
    return errorMessages;
  },

  codAluno: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim() === '') {
      errorMessages.push(MENSAGEMS_VALIDACAO.CODIGO_ALUNO.valid);
    }
    return errorMessages;
  },

  nomeAluno: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim() === '') {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_ALUNO.blank);
    }
    if (value && value.trim().length < 2) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_ALUNO.length);
    }
    return errorMessages;
  },
};

export const useValidarDadosAluno = () => {
  return useValidacao(ALUNO_INICIAL, usuarioValidationRules);
};
