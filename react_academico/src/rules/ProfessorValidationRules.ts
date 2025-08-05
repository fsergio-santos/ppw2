// /hooks/useValidarDadosUsuario.ts

import { useValidacao } from '../hook/useValidacao';
import { emailRegex } from '../service/constant/Constantes';
import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';
import type { Professor } from '../type/Professor';
import type { ValidationRules } from '../type/validation.types';

// 1. Defina o estado inicial para um novo usuário
const PROFESSOR_INICIAL: Professor = {
  idUsuario: '',
  codUsuario: '',
  nomeUsuario: '',
  email: '',
  senha: '',
  confirmSenha: '',
  idCidade: '',
  nomeCidade: '',
  idProfessor: '',
  codProfessor: '',
  nomeProfessor: '',
  foto: '',
  contentType: '',
};

const usuarioValidationRules: ValidationRules<Professor> = {
  codUsuario: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CODIGO_USUARIO.valid);
    }
    return errorMessages;
  },

  nomeUsuario: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_USUARIO.blank);
    }
    if (!value || value.trim().length < 3) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_USUARIO.length);
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
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CONFIRM_SENHA.valid);
    }
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

  codProfessor: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CODIGO_PROFESSOR.valid);
    }
    return errorMessages;
  },

  nomeProfessor: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_PROFESSOR.blank);
    }
    if (value && value.trim().length < 2) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_PROFESSOR.length);
    }
    return errorMessages;
  },
};

export const useValidarDadosProfessor = () => {
  return useValidacao(PROFESSOR_INICIAL, usuarioValidationRules);
};
