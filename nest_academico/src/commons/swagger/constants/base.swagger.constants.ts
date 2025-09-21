export const SWAGGER_TAGS = {
   CIDADE: 'Cidade',
   USUARIO: 'Usuário',
   ALUNO: 'Aluno',
   PROFESSOR: 'Professor',
   AUTH:'Autenticação',

} as const;

export const SWAGGER_BASE_RESPONSES = {
  SUCCESS: {
    CREATED: {
      status: 201,
      description: 'Recurso criado com sucesso',
    },
    OK: {
      status: 200,
      description: 'Operação realizada com sucesso',
    },
    NO_CONTENT: {
      status: 204,
      description: 'Operação realizada com sucesso, sem conteúdo de retorno',
    },
  },
  ERROR: {
    BAD_REQUEST: {
      status: 400,
      description: 'Dados de entrada inválidos',
    },
    UNAUTHORIZED: {
      status: 401,
      description: 'Não autorizado - Token inválido ou ausente',
    },
    FORBIDDEN: {
      status: 403,
      description: 'Acesso negado - Permissões insuficientes',
    },
    NOT_FOUND: {
      status: 404,
      description: 'Recurso não encontrado',
    },
    CONFLICT: {
      status: 409,
      description: 'Conflito - Recurso já existe',
    },
    INTERNAL_SERVER_ERROR: {
      status: 500,
      description: 'Erro interno do servidor',
    },
  },
} as const;

export const SWAGGER_BASE_PARAMETERS = {
  FIELD: {
    name: 'field',
    description: 'Atributo da tabela para ordenação',
    type: 'string',
    required: true,
  },
  ORDER: {
    name: 'order',
    description: 'Ordenação da pesquisa ASC - Crescente, DESC - decrescente',
    type: 'string',
    required: true,
  },
  PAGE: {
    name: 'page',
    description: 'Número da página (padrão: 1)',
    type: 'number',
    required: false,
  },
  PAGESIZE: {
    name: 'pageSize',
    description: 'Quantidade de itens por página (padrão: 10)',
    type: 'number',
    required: false,
  },
  SEARCH: {
    name: 'search',
    description: 'Termo de busca para filtrar resultados',
    type: 'string',
    required: false,
  },
} as const;
