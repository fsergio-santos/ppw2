import { MENSAGEMS_VALIDACAO } from '../service/errors/MensagensValidacao';

export interface Cidade {
  idCidade: string;
  codCidade: string;
  nomeCidade: string;
}

export const camposObrigatoriosDaCidade = ['idCidade', 'codCidade', 'nomeCidade'] as (keyof Cidade)[];

export const mensagensCamposObrigatoriosDaCidade: Partial<Record<keyof Cidade, string>> = {
  idCidade: MENSAGEMS_VALIDACAO.ID.blank,
  codCidade: MENSAGEMS_VALIDACAO.CODIGO_CIDADE.valid,
  nomeCidade: MENSAGEMS_VALIDACAO.NOME_CIDADE.blank,
};
