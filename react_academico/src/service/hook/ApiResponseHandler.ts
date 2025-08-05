import { getMessageByType } from '../errors/StatusMensagens';

type ApiResponseErro = {
  tratarErrosApi: (error: any) => {
    status?: number;
    mensagem: string;
    dados?: any;
  };
};

export function useApiResponseHandler(): ApiResponseErro {
  function tratarErrosApi(error: any) {
    const response = error?.response;
    const data = response?.data ?? null;
    const status = data?.status ?? response?.status;
    const mensagem = data?.mensagem ?? getMessageByType(status);
    const dados = data?.dados;
    return { status, mensagem, dados };
  }
  return {
    tratarErrosApi,
  };
}
