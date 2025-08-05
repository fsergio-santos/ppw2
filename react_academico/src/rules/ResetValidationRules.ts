// /hooks/useValidarDadosUsuario.ts

import { useValidacao } from '../hook/useValidacao';
import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';
import type { Reset } from '../type/Reset';
import type { ValidationRules } from '../type/validation.types';

const RESET_INICIAL: Reset = {
  senha: '',
  confirmSenha: '',
};

const resetValidationRules: ValidationRules<Reset> = {
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

export const useValidarDadosReset = () => {
  return useValidacao(RESET_INICIAL, resetValidationRules);
};
