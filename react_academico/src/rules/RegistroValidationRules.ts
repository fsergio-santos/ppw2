// /hooks/useValidarDadosUsuario.ts

import { useValidacao } from '../hook/useValidacao';
import { emailRegex } from '../service/constant/Constantes';
import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';
import type { Registro } from '../type/Registro';
import type { ValidationRules } from '../type/validation.types';

const REGISTRO_INICIAL: Registro = {
  nomeUsuario: '',
  email: '',
  senha: '',
  confirmSenha: '',
};

const registroValidationRules: ValidationRules<Registro> = {
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
};

export const useValidarDadosRegistro = () => {
  return useValidacao(REGISTRO_INICIAL, registroValidationRules);
};
