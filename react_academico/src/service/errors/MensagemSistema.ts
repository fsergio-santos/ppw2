import { ALUNO, CIDADE, LOGIN, PROFESSOR, USUARIO } from '../constant/Constantes';

function gerarMensagemSistema(entity: string) {
  return {
    DANGER: `Verique os erros mostrados na tela -  ${entity} `,
    DELETE: `Erro na exclusão do registro solicitado - ${entity}`,
    SAVE_FORM: `Salvar o cadastro `,
    CANCEL_FORM: `Cancelar o cadastro `,
    DELETE_FORM: `Excluir o cadastro `,
    RECOVERY_PASSWORD_FORM: `Recuperar senha`,
    CREATE_ACCOUNT: `Criar conta`,
  };
}

export const MENSAGEM_SISTEMA = {
  USUARIO: gerarMensagemSistema(USUARIO),
  ALUNO: gerarMensagemSistema(ALUNO),
  CIDADE: gerarMensagemSistema(CIDADE),
  PROFESSOR: gerarMensagemSistema(PROFESSOR),
  LOGIN: gerarMensagemSistema(LOGIN),
};
