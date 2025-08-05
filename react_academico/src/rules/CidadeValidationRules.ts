// /hooks/useValidarDadosUsuario.ts

import { useValidacao } from '../hook/useValidacao';
import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';
import type { Cidade } from '../type/Cidade';
import type { ValidationRules } from '../type/validation.types';

// 1. Defina o estado inicial para um novo usuário
const CIDADE_INICIAL: Cidade = {
  idCidade: '',
  codCidade: '',
  nomeCidade: '',
};

const cidadeValidationRules: ValidationRules<Cidade> = {
  codCidade: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.CODIGO_CIDADE.valid);
    }
    return errorMessages;
  },

  nomeCidade: (value) => {
    const errorMessages: string[] = [];
    if (!value || value.trim().length === 0) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_CIDADE.valid);
    }
    if (!value || value.trim().length < 3) {
      errorMessages.push(MENSAGEMS_VALIDACAO.NOME_CIDADE.length);
    }
    return errorMessages;
  },
};

export const useValidarDadosCidade = () => {
  return useValidacao(CIDADE_INICIAL, cidadeValidationRules);
};
