import { ALUNO } from '../../aluno/constants/aluno.constants';
import { criarMensagensOperacao } from '../../commons/constants/constants.entity';
import { DISCIPLINA } from '../../disciplina/constants/disciplina.constants';

const ENTITY_NAME = 'Matricula';

export const MATRICULA = {
  ENTITY: ENTITY_NAME,

  TABLE: 'ALUNO_DISCIPLINA',

  TABLE_FIELD: {
    DISCIPLINA_ID: 'DISCIPLINA_ID',
    ALUNO_ID: 'ALUNO_ID',
  },

  ALIAS: 'matricula',
  TO_ALUNO: ALUNO.ALIAS,
  TO_DISCIPLINA: DISCIPLINA.ALIAS,

  FIELDS: {
    ALUNO_ID: 'alunoId',
    DISCIPLINA_ID: 'disciplinaId',
    ALUNO_NOME: 'alunoNome',
    DISCIPLINA_NOME: 'disciplinaNome',
    PERIODO: 'periodo',
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
      BLANK: `O ID do Aluno deve ser informado para a ${ENTITY_NAME}`,
      VALID: `Informe um código de Aluno válido para a ${ENTITY_NAME}`,
      NUMBER: `O ID do Aluno deve ser um número`,
    },
  },

  OPERACAO: criarMensagensOperacao(ENTITY_NAME),
};

export const fieldsMatricula = Object.values(MATRICULA.FIELDS);
