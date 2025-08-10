enum MENSAGEM_GENERICA {
  LOGIN_NAO_EXISTE = 'LOGIN_NAO_EXISTE',
  LOGIN_EFETUADO = 'LOGIN_EFETUADO',
  LOGOUT_EFETUADO = 'LOGOUT_EFETUADO',
  TOKEN_INVALIDO = 'TOKEN_INVALIDO',
  ACESSO_PROIBIDO = 'ACESSO_PROIBIDO',
  SEM_AUTORIZACAO = 'SEM_AUTORIZACAO',
  NAO_ENCONTRADO = 'NAO_ENCONTRADO',
  EMAIL_CADASTRADO = 'EMAIL_CADASTRADO',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  DADOS_INVALIDOS = 'DADOS_INVALIDOS',
  SENHAS_NAO_CONFEREM = 'SENHAS_NAO_CONFEREM',
  ERRO_SMTP = 'ERRO_SMTP',
  ERRO_ENVIO_EMAIL = 'ERRO_ENVIO_EMAIL',
  ID_OBRIGATORIO = 'ID_OBRIGATORIO',
  RESET_PASSWORD = 'RESET_PASSWORD',
  ERRO_INTERNO_DO_SERVIDOR = 'ERRO_INTERNO_DO_SERVIDOR',
  JSON_APPLICATION = 'JSON_APPLICATION',
  IDENTIFICADOR_UNICO = 'IDENTIFICADOR_UNICO',
}

type MensagensGenericas = {
  [key in MENSAGEM_GENERICA]: string;
};

export const MENSAGENS_GENERICAS: MensagensGenericas = {
  [MENSAGEM_GENERICA.LOGIN_NAO_EXISTE]: 'Login não localizado ou senha inválida.',
  [MENSAGEM_GENERICA.LOGIN_EFETUADO]: 'Login realizado com sucesso.',
  [MENSAGEM_GENERICA.LOGOUT_EFETUADO]: 'Logout realizado com sucesso ',
  [MENSAGEM_GENERICA.TOKEN_INVALIDO]: 'Token inválido.',
  [MENSAGEM_GENERICA.ACESSO_PROIBIDO]: 'Acesso proibido.',
  [MENSAGEM_GENERICA.SEM_AUTORIZACAO]: 'Usuário não tem autorização para acessar esse recurso.',
  [MENSAGEM_GENERICA.NAO_ENCONTRADO]: 'Registro não localizado no sistema.',
  [MENSAGEM_GENERICA.EMAIL_CADASTRADO]: 'O e-mail informado já está cadastrado no sistema.',
  [MENSAGEM_GENERICA.REFRESH_TOKEN]: 'Token atualizado com sucesso.',
  [MENSAGEM_GENERICA.DADOS_INVALIDOS]: 'Dados inválidos ou incompletos.',
  [MENSAGEM_GENERICA.SENHAS_NAO_CONFEREM]: 'As senhas informadas não conferem.',
  [MENSAGEM_GENERICA.ERRO_SMTP]: 'Erro ao enviar e-mail, verifique as configurações do servidor SMTP.',
  [MENSAGEM_GENERICA.ERRO_ENVIO_EMAIL]: 'Erro ao enviar e-mail, por favor tente novamente mais tarde.',
  [MENSAGEM_GENERICA.ID_OBRIGATORIO]: 'O código de Identificação é obrigatório para esta operação.',
  [MENSAGEM_GENERICA.RESET_PASSWORD]: 'Senha redefinida com sucesso.',
  [MENSAGEM_GENERICA.ERRO_INTERNO_DO_SERVIDOR]: 'Erro interno no servidor, tente mais tarde',
  [MENSAGEM_GENERICA.JSON_APPLICATION]: 'application/json',
  [MENSAGEM_GENERICA.IDENTIFICADOR_UNICO]: 'Identificador único',
};
