import { criarMensagensOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'Aluno';

export const ALUNO = {
  ENTITY: ENTITY_NAME,

  TABLE: 'ALUNO',

  TABLE_FIELD: {
    ID_ALUNO: 'ID_ALUNO',
    COD_ALUNO: 'COD_ALUNO',
    NOME_ALUNO: 'NOME_ALUNO',
    IDADE: 'IDADE',
  },

  ALIAS: 'Aluno',

  FIELDS: {
    ID: 'idAluno',
    CODIGO: 'codAluno',
    NOME: 'nomeAluno',
    IDADE: 'idade',
  },

  SWAGGER: {
    ID: `Código do ${ENTITY_NAME} de identificação única `,
    CODIGO: `Código do ${ENTITY_NAME}`,
    NOME: `Nome do ${ENTITY_NAME}`,
    IDADE: `Idade do ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ID: {
      BLANK: `O código de identificação do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código de identificação válido para o ${ENTITY_NAME}`,
    },
    CODIGO: {
      BLANK: `O código do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código válido para o ${ENTITY_NAME}`,
      LEN: `O código do ${ENTITY_NAME} deve conter no máximo 20 caracteres`,
    },
    NOME: {
      BLANK: `O nome do ${ENTITY_NAME} deve ser informado`,
      VALID: `O nome do ${ENTITY_NAME} não está digitado corretamente`,
      LEN: `O nome do ${ENTITY_NAME} deve conter pelo menos 6 caracteres e no máximo 100`,
    },
    IDADE: {
      BLANK: `A idade do ${ENTITY_NAME} deve ser informada`,
      VALID: `Informe uma idade válida para o ${ENTITY_NAME}`,
    },
  },

  OPERACAO: criarMensagensOperacao(ENTITY_NAME),
};

export const fieldsAluno = Object.values(ALUNO.FIELDS);
