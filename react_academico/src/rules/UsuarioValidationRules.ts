// /hooks/useValidarDadosUsuario.ts

import { useValidacao } from '../hook/useValidacao';
import { emailRegex } from '../service/constant/Constantes';
import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';
import type { Usuario } from '../type/Usuario';
import type { ValidationRules } from '../type/validation.types';

const USUARIO_INICIAL: Usuario = {
  idUsuario: '',
  codUsuario: '',
  nomeUsuario: '',
  email: '',
  senha: '',
  confirmSenha: '',
  tipo: '',
  idCidade: '',
  nomeCidade: '',
  idade: '',
  idAluno: '',
  codAluno: '',
  nomeAluno: '',
  idProfessor: '',
  codProfessor: '',
  nomeProfessor: '',
  foto: '',
  contentType: '',
};

const usuarioValidationRules: ValidationRules<Usuario> = {
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
    if (value !== model.senha) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CONFIRM_SENHA.equals);
    }
    return errorMessages;
  },

  tipo: (value) => {
    const errorMessages: string[] = [];
    if (!value || String(value).trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.TIPO.valid);
    }
    return errorMessages;
  },

  idCidade: (value) => {
    const errorMessages: string[] = [];
    if (!value || String(value).trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_CIDADE.blank);
    }
    return errorMessages;
  },
  nomeCidade: (value) => {
    const errorMessages: string[] = [];
    if (!value || String(value).trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_CIDADE.blank);
    }
    return errorMessages;
  },
  idade: (value, model) => {
    const errorMessages: string[] = [];
    if (String(model.tipo) === '2') {
      if (!value || Number(value) <= 0) {
        errorMessages.push(MENSAGEMS_VALIDACAO.IDADE.valid);
      }
    }
    return errorMessages;
  },

  idAluno: (value, model) => {
    const isEdicao = !!model.idUsuario;
    const isAluno = String(model.tipo) === '2';
    const errorMessages: string[] = [];
    if (isEdicao && isAluno && (!value || value.trim() === '')) {
      errorMessages.push(MENSAGEMS_VALIDACAO.ID.blank);
    }
    return errorMessages;
  },

  codAluno: (value, model) => {
    const errorMessages: string[] = [];
    if (String(model.tipo) === '2' && (!value || value.trim() === '')) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CODIGO_ALUNO.valid);
    }
    return errorMessages;
  },

  nomeAluno: (value, model) => {
    const errorMessages: string[] = [];
    if (String(model.tipo) === '2') {
      if (!value || value.trim() === '') {
        errorMessages.push(MENSAGEMS_VALIDACAO.NOME_ALUNO.blank);
      }
      if (value && value.trim().length < 2) {
        errorMessages.push(MENSAGEMS_VALIDACAO.NOME_ALUNO.length);
      }
    }
    return errorMessages;
  },

  codProfessor: (value, model) => {
    const errorMessages: string[] = [];
    if (String(model.tipo) === '1' && (!value || value.trim().length === 0)) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CODIGO_PROFESSOR.valid);
    }
    return errorMessages;
  },

  nomeProfessor: (value, model) => {
    const errorMessages: string[] = [];
    if (String(model.tipo) === '1') {
      if (!value || value.trim().length === 0) {
        errorMessages.push(MENSAGEMS_VALIDACAO.NOME_PROFESSOR.blank);
      }
      if (value && value.trim().length < 2) {
        errorMessages.push(MENSAGEMS_VALIDACAO.NOME_PROFESSOR.length);
      }
    }
    return errorMessages;
  },
};

export const useValidarDadosUsuario = () => {
  return useValidacao(USUARIO_INICIAL, usuarioValidationRules);
};
