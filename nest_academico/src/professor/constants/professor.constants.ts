import { criarMensagensOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'Diciplina';

export const PROFESSOR = {
  ENTITY: ENTITY_NAME,

  TABLE: 'PROFESSOR',

  TABLE_FIELD: {
    ID_PROFESSOR: 'ID_PROFESSOR',
    COD_PROFESSOR: 'COD_PROFESSOR',
    NOME_PROFESSOR: 'NOME_PROFESSOR',
  },

  ALIAS: 'disciplina',

  FIELDS: {
    ID: 'idProfessor',
    CODIGO: 'codProfessor',
    NOME: 'nomeProfessor',
  },

  SWAGGER: {
    ID: `Código de ${ENTITY_NAME} de identificação única `,
    CODIGO: `Código de ${ENTITY_NAME}`,
    NOME: `Nome de ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ID: {
      BLANK: `O código de identificação do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código de identificação válido para o ${ENTITY_NAME}`,
    },
    CODIGO: {
      BLANK: `O código do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código válido para o ${ENTITY_NAME}`,
      MAX_LEN: `O código do ${ENTITY_NAME} deve conter no máximo 20 caracteres`,
      MIN_LEN: `O código do ${ENTITY_NAME} deve conter no mínimo 6 caracteres`,
      STRING: `O código do ${ENTITY_NAME} dever ser um texto `,
    },
    NOME: {
      BLANK: `O nome do ${ENTITY_NAME} deve ser informado`,
      VALID: `O nome do ${ENTITY_NAME} não está digitado corretamente`,
      MAX_LEN: `O nome do ${ENTITY_NAME} deve conter no máximo 100 caracteres`,
      MIN_LEN: `O nome do ${ENTITY_NAME} deve conter no mínimo 6 caracteres`,
      STRING: `O nome do ${ENTITY_NAME} dever ser um texto `,
    },
  },

  OPERACAO: criarMensagensOperacao(ENTITY_NAME),
};

export const fieldsProfessor = Object.values(PROFESSOR.FIELDS);
