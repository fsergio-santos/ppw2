import { ALUNO } from '../../aluno/constants/aluno.constants';
import { CIDADE } from '../../cidade/constants/cidade.constants';
import { DISCIPLINA } from '../../disciplina/constants/disciplina.constants';
import { MATRICULA } from '../../matricula/constants/alunodisciplina.constants';
import { USUARIO } from '../../usuario/constants/usuario.constants';
import { TipoOperacaoEntidade } from '../enum/tipo.operacao.enum';
import { AUTH, PROFESSOR } from './constants.sistema';

type MensagensEntidade = {
  [key in TipoOperacaoEntidade]: string;
};

interface EntityConfig {
  singular: string;
  plural: string;
  gender?: 'm' | 'f';
}

const ENTITIES_CONFIG: { [key: string]: EntityConfig } = {
  professor: { singular: 'professor', plural: 'professores', gender: 'm' },
  usuario: { singular: 'usuário', plural: 'usuários', gender: 'm' },
  aluno: { singular: 'aluno', plural: 'alunos', gender: 'm' },
  cidade: { singular: 'cidade', plural: 'cidades', gender: 'f' },
  auth: { singular: 'autenticação', plural: 'autenticações', gender: 'f' },
};

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getEntityAlias(entityAlias: string): string {
  return entityAlias;
}

function getEntityDisplayName(entityKey: string): string {
  const config = ENTITIES_CONFIG[entityKey];
  return config ? capitalize(config.singular) : capitalize(entityKey);
}

// Função para obter o nome plural da entidade
function getEntityPluralDisplayName(entityKey: string): string {
  const config = ENTITIES_CONFIG[entityKey];
  return config ? config.plural : `${entityKey}s`; // Fallback simples se não configurado
}

// --- 5. Função para Gerar Mensagens de Entidade ---
function gerarMensagensEntidade(entityKey: string): MensagensEntidade {
  const nomeSingularCapitalizado = getEntityDisplayName(entityKey);
  const nomePluralLower = getEntityPluralDisplayName(entityKey).toLowerCase();

  return {
    [TipoOperacaoEntidade.CRIAR]: `${nomeSingularCapitalizado} cadastrado no sistema.`,
    [TipoOperacaoEntidade.ATUALIZAR]: `${nomeSingularCapitalizado} atualizado com sucesso.`,
    [TipoOperacaoEntidade.EXCLUIR]: `${nomeSingularCapitalizado} removido do sistema.`,
    [TipoOperacaoEntidade.LISTAR]: `Lista de ${nomePluralLower} carregada com sucesso.`,
    [TipoOperacaoEntidade.POR_ID]: `${nomeSingularCapitalizado} localizado com sucesso.`,
    [TipoOperacaoEntidade.CHECK_EMAIL]: `${nomeSingularCapitalizado} verifique seu e-mail.`,
    [TipoOperacaoEntidade.OPERACAO_CRIAR]: `Criar um novo ${nomeSingularCapitalizado}`,
    [TipoOperacaoEntidade.OPERACAO_ATUALIZAR]: `Atualizar os dados - ${nomeSingularCapitalizado}`,
    [TipoOperacaoEntidade.OPERACAO_POR_ID]: `Mostra os dados - ${nomeSingularCapitalizado} - por um identificador único`,
    [TipoOperacaoEntidade.OPERACAO_EXCLUIR]: `Exclui os dados - ${nomeSingularCapitalizado} - por um identificador único`,
    [TipoOperacaoEntidade.OPERACAO_LISTAR]: `Listagem dos dados - ${nomePluralLower} `,
    [TipoOperacaoEntidade.LOGIN]: `Login do ${nomeSingularCapitalizado} no sistema`,
    [TipoOperacaoEntidade.LOGOUT]: `Logout do ${nomeSingularCapitalizado} no sistema`,
    [TipoOperacaoEntidade.PROFILE]: `${nomeSingularCapitalizado} logado no sistema`,
    [TipoOperacaoEntidade.JACADASTRADO]: `${nomeSingularCapitalizado} já cadastgrado no sistema `,
  };
}

export const MENSAGEM = {
  USUARIO: gerarMensagensEntidade(USUARIO.ALIAS),
  PROFESSOR: gerarMensagensEntidade(PROFESSOR),
  ALUNO: gerarMensagensEntidade(ALUNO.ALIAS),
  CIDADE: gerarMensagensEntidade(CIDADE.ALIAS),
  AUTH: gerarMensagensEntidade(AUTH),
  DISCIPLINA: gerarMensagensEntidade(DISCIPLINA.ALIAS),
  MATRICULA: gerarMensagensEntidade(MATRICULA.ALIAS),
};

export const SHOW_ENTITY = {
  USUARIO: getEntityDisplayName(USUARIO.ALIAS),
  PROFESSOR: getEntityDisplayName(PROFESSOR),
  ALUNO: getEntityDisplayName(ALUNO.ALIAS),
  CIDADE: getEntityDisplayName(CIDADE.ALIAS),
  AUTH: getEntityDisplayName(AUTH),
  DISCIPLINA: getEntityDisplayName(DISCIPLINA.ALIAS),
  MATRICULA: getEntityDisplayName(MATRICULA.ALIAS),
};

export const ENTITY_ALIAS = {
  USUARIO: getEntityAlias(USUARIO.ALIAS),
  PROFESSOR: getEntityAlias(PROFESSOR),
  ALUNO: getEntityAlias(ALUNO.ALIAS),
  CIDADE: getEntityAlias(CIDADE.ALIAS),
  AUTH: getEntityAlias(AUTH),
  DISCIPLINA: getEntityAlias(DISCIPLINA.ALIAS),
};
