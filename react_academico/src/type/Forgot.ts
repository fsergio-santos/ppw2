import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';

export interface Forgot {
  email: string;
}

export const camposObrigatoriosDoForgot = ['email'] as (keyof Forgot)[];

export const mensagensCamposObrigatoriosDoForgot: Partial<Record<keyof Forgot, string>> = {
  email: MENSAGEMS_VALIDACAO.EMAIL.valid,
};
