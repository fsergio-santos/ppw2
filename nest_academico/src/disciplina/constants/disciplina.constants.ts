const ENTITY_NAME = 'Diciplina';

export const DISCIPLINA = {
  ENTITY: ENTITY_NAME,

  DATABASE_TABLE: 'DISCIPLINA',

  DATABASE_FIELD: {
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

  OPERACAO: {
    CRIAR: {
      ACAO: `Criar uma nova ${ENTITY_NAME} no sistema`,
      SUCESSO: `A ${ENTITY_NAME} foi criada com sucesso`,
      ERRO: `Falha na criação da ${ENTITY_NAME} no sistema`,
      EXISTE: `A ${ENTITY_NAME} já está cadastrada no sistema`,
    },
    ATUALIZAR: {
      ACAO: `Atualizar as informações de uma ${ENTITY_NAME} no sistema`,
      SUCESSO: `A ${ENTITY_NAME} foi atualizada com sucesso`,
      ERRO: `Falha na atualização da ${ENTITY_NAME} no sistema`,
      NAO_LOCALIZADO: `O código da ${ENTITY_NAME} não foi localizada no sistema`,
    },
    POR_ID: {
      ACAO: `Mostrar os dados de uma ${ENTITY_NAME} por um identificador único cadastrada no sistema`,
      SUCESSO: `A ${ENTITY_NAME} foi localizada com sucesso no sistema `,
      ERRO: `A ${ENTITY_NAME} não foi localizada no sistema `,
      NAO_LOCALIZADO: `O código da ${ENTITY_NAME} não foi localizada no sistema`,
    },
    EXCLUIR: {
      ACAO: `Exclui os dados de uma ${ENTITY_NAME} por um identificador único cadastrada no sistema`,
      SUCESSO: `${ENTITY_NAME} foi excluída com sucesso no sistema`,
      ERRO: `Falha na exclusão da ${ENTITY_NAME} no sistema `,
      NAO_LOCALIZADO: `O código da ${ENTITY_NAME} não foi localizada no sistema`,
    },
    LISTAR: {
      ACAO: `Listagem dos dados das ${ENTITY_NAME}s cadastradas no sistema`,
      SUCESSO: `Consulta das ${ENTITY_NAME}s realizada com sucesso no sistema `,
      ERRO: `Falha na consulta das ${ENTITY_NAME}s no sistema `,
    },
  },
};

export const fieldsDisciplina = Object.values(DISCIPLINA.FIELDS);
