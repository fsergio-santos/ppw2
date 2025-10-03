import { criarMensagensOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'Diciplina';

export const DISCIPLINA = {
  ENTITY: ENTITY_NAME,

  TABLE: 'DISCIPLINA',

  TABLE_FIELD: {
    ID_DISCIPLINA: 'ID_DISCIPLINA',
    PERIODO: 'PERIODO',
    NOME_DISCIPLINA: 'NOME_DISCIPLINA',
    ID_PROFESSOR: 'ID_PROFESSOR',
  },

  ALIAS: 'disciplina',

  FIELDS: {
    ID: 'idDisciplina',
    CODIGO: 'codDisciplina',
    PERIODO: 'periodo',
    NOME: 'nomeDisciplina',
    IDPROFESSOR: 'idProfessor',
    NOMEPROFESSOR: 'nomeProfessor',
  },

  SWAGGER: {
    ID: `Código da ${ENTITY_NAME} de identificação única `,
    CODIGO: `Código da ${ENTITY_NAME}`,
    NOME: `Nome da ${ENTITY_NAME}`,
    PERIODO: `Período de oferecimento da ${ENTITY_NAME} no curso `,
    IDPROFESSOR: `${ENTITY_NAME} atribuída ao professor no período de oferecimento no curso `,
    NOMEPROFESSOR: `Nome do professor que está ministando a ${ENTITY_NAME} no período de oferecimento no curso`,
  },

  INPUT_ERROR: {
    ID: `Identificação única da ${ENTITY_NAME} `,
    CODIGO: `Código da ${ENTITY_NAME} deve ser informado`,
    NOME: {
      TXT: `Nome da ${ENTITY_NAME} deve ser informada  `,
      LEN: `O tamanho do nome da ${ENTITY_NAME} é de `,
    },
    PERIODO: `Período de oferecimento da ${ENTITY_NAME} no curso deve ser informado`,
    IDPROFESSOR: `O código do Professor deve ser informado `,
  },

  OPERACAO: criarMensagensOperacao(ENTITY_NAME),
};

export const fieldsDisciplina = Object.values(DISCIPLINA.FIELDS);
