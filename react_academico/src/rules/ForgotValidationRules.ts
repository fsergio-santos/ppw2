// /hooks/useValidarDadosUsuario.ts

import { useValidacao } from '../hook/useValidacao';
import { emailRegex } from '../service/constant/Constantes';
import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';
import type { Forgot } from '../type/Forgot';
import type { ValidationRules } from '../type/validation.types';

const FORGOT_INICIAL: Forgot = {
  email: '',
};

const forgotValidationRules: ValidationRules<Forgot> = {
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
};

export const useValidarDadosForgot = () => {
  return useValidacao(FORGOT_INICIAL, forgotValidationRules);
};
