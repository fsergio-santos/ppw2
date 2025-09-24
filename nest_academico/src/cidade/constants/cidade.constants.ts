const ENTITY_NAME = 'Cidade';

export const CIDADE = {
  ENTITY: ENTITY_NAME,

  DATABASE_TABLE: 'CIDADE',

  DATABASE_FIELD: {
    ID_CIDADE: 'ID_CIDADE',
    COD_CIDADE: 'COD_CIDADE',
    NOME_CIDADE: 'NOME_CIDADE',
  },

  ALIAS: 'cidade',

  FIELDS: {
    ID: 'idCidade',
    CODIGO: 'codCidade',
    NOME: 'nomeCidade',
  },

  SWAGGER: {
    ID: `Código da ${ENTITY_NAME} de identificação única `,
    CODIGO: `Código da ${ENTITY_NAME}`,
    NOME: `Nome da ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ID: `Identificação única da ${ENTITY_NAME} `,
    CODIGO: {
      TXT: `Código da ${ENTITY_NAME} deve ser informado`,
      LEN: `O tamanho do código da ${ENTITY_NAME} é de `,
    },
    NOME: {
      TXT: `Nome da ${ENTITY_NAME} deve ser informada  `,
      LEN: `O tamanho do nome da ${ENTITY_NAME} é de `,
    },
  },

  OPERACAO: {
    CRIAR: {
      ACAO: `Criar uma nova ${ENTITY_NAME} no sistema`,
      SUCESSO: `A ${ENTITY_NAME} FOI criada com sucesso`,
      ERRO: `Falha na criação da ${ENTITY_NAME} no sistema`,
      EXISTE: `A ${ENTITY_NAME} já está cadastrada no sistema `,
    },
    ATUALIZAR: {
      ACAO: `Atualizar as informações de uma ${ENTITY_NAME} no sistema`,
      SUCESSO: ` A ${ENTITY_NAME} foi atualizada com sucesso`,
      ERRO: `Falha na atualização da ${ENTITY_NAME} no sistema`,
      NAO_LOCALIZADO: `O código informado da ${ENTITY_NAME} não foi ocalizada no sistema`,
    },
    POR_ID: {
      ACAO: `Mostrar os dados de uma ${ENTITY_NAME} por um identificador único cadastrada no sistema`,
      SUCESSO: `A ${ENTITY_NAME} foi localizada com sucesso no sistema `,
      ERRO: `A ${ENTITY_NAME} não foi localizada no sistema `,
      NAO_LOCALIZADO: `O código informado da ${ENTITY_NAME} não foi localizada no sistema`,
    },
    EXCLUIR: {
      ACAO: `Exclui os dados de uma ${ENTITY_NAME} por um identificador único cadastrada no sistema`,
      SUCESSO: `${ENTITY_NAME} excluída com sucesso no sistema`,
      ERRO: `Falha na exclusão da ${ENTITY_NAME} no sistema `,
      NAO_LOCALIZADO: `O código informado da ${ENTITY_NAME} não foi localizada no sistema`,
    },
    LISTAR: {
      ACAO: `Listagem dos dados das ${ENTITY_NAME}s cadastradas no sistema`,
      SUCESSO: `Consulta das ${ENTITY_NAME}s realizada com sucesso no sistema `,
      ERRO: `Falha na consulta das ${ENTITY_NAME}s no sistema `,
    },
  },
};

export const fieldsCidade = Object.values(CIDADE.FIELDS);
