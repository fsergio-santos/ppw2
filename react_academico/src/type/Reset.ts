import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';

export interface Reset {
  senha: string;
  confirmSenha: string;
}

export const camposObrigatoriosDoReset = ['senha', 'confirmSenha'] as (keyof Reset)[];

export const mensagensCamposObrigatoriosDoReset: Partial<Record<keyof Reset, string>> = {
  senha: MENSAGEMS_VALIDACAO.SENHA.valid,
  confirmSenha: MENSAGEMS_VALIDACAO.CONFIRM_SENHA.valid,
};
