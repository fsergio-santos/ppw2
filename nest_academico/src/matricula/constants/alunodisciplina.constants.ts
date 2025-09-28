import { criarMensagensOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'MATRÍCULA';

export const MATRICULA = {
  ENTITY: ENTITY_NAME,

  TABLE: 'ALUNO_DISCIPLINA',

  TABLE_FIELD: {
    DISCIPLINA_ID: 'DISCIPLINA_ID',
    ALUNO_ID: 'ALUNO_ID',
    CREATED_AT: 'CREATED_AT',
    UPDATED_AT: 'UPDATED_AT',
  },

  ALIAS: 'Matricula',

  FIELDS: {
    ALUNO_ID: 'alunoId',
    DISCIPLINA_ID: 'disciplinaId',
    DISCIPLINA_IDS: 'disciplinaIds', // Campo para arrays em DTOs
    ALUNO_NOME: 'alunoNome',
    DISCIPLINA_NOME: 'disciplinaNome',
    PERIODO: 'periodo',
    MATRICULADO_EM: 'matriculadoEm',
  },

  SWAGGER: {
    ALUNO_ID: `Código do Aluno de identificação única para a ${ENTITY_NAME}`,
    ALUNO_NOME: `Nome do Aluno `,
    DISCIPLINA_ID: `Código da Disciplina de identificação única para a ${ENTITY_NAME}`,
    DISCIPLINA_NOME: `Nome da Disciplina `,
    PERIODO: `Período de oferecimento da disciplina no curso`,
    DISCIPLINA_IDS: `Lista de códigos das Disciplinas para a ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ALUNO_ID: {
      BLANK: `O ID do Aluno deve ser informado para a ${ENTITY_NAME}`,
      VALID: `Informe um código de Aluno válido para a ${ENTITY_NAME}`,
      NUMBER: `O ID do Aluno deve ser um número`,
    },
    DISCIPLINA_ID: {
      BLANK: `O ID da Disciplina deve ser informado para a ${ENTITY_NAME}`,
      VALID: `Informe um código de Disciplina válido para a ${ENTITY_NAME}`,
      NUMBER: `O ID da Disciplina deve ser um número`,
    },
    DISCIPLINA_IDS: {
      BLANK: `A lista de IDs de disciplina não pode ser vazia`,
      ARRAY: `A lista de disciplinas deve ser um array (lista)`,
      ARRAY_NUMBER: `Todos os IDs na lista de disciplinas devem ser números`,
    },
  },

  // Supondo a existência da mesma função helper para gerar mensagens padrão
  OPERACAO: criarMensagensOperacao(ENTITY_NAME),
};

// Helper para exportar todos os nomes de campos para fácil utilização
export const fieldsMatricula = Object.values(MATRICULA.FIELDS);
