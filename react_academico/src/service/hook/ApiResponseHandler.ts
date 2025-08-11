import type { AxiosError } from 'axios';
import type { MensagemServidor } from '../../type/MensagemServidor';
import { getMessageByStatus, getMessageByType, isAxiosErrorCode, type AxiosErrorCode } from '../errors/StatusMensagens';
import MESSAGES from '../errors/Mensagens';

type ApiResponseErro<T>  {
  tratarErrosApi: (error: unknown) => MensagemServidor<T>;
};


export function useApiResponseHandler<T>(): ApiResponseErro<T> {
  function tratarErrosApi(error: unknown) {
    let status = 500;
    let mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR;
    let dados: T | null = null;
    let path: string | undefined = undefined;
    let metodo: string | undefined = undefined;
    let dataStr: string | undefined = undefined; 

    if (error && typeof error === 'object' && 'response' in (error as any)) {
      const axiosError = error as AxiosError & { code?: string };
      const response = (error as AxiosError<MensagemServidor<T>>).response;
      const data = response?.data;
      status = data?.status ?? response?.status ?? 500;

      mensagem =
        data?.mensagem ??
        (isAxiosErrorCode(axiosError.code)
          ? getMessageByType(axiosError as AxiosError & { code: AxiosErrorCode })
          : getMessageByStatus(status));
      dados = (data?.dados as T) ?? null;
      path = data?.path;
      metodo = data?.metodo;
      dataStr = data?.data;

    }
    return {
      status,
      mensagem,
      dados,
      path,
      metodo,
      dataStr
    };
  }
  return {
    tratarErrosApi,
  };
}
