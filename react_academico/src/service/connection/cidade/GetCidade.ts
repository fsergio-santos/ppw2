import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { Cidade } from '../../../type/Cidade';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';
import MESSAGES from '../../errors/Mensagens';

type UseGetCidadeProps = {
  findCidadeById: (id: string) => Promise<MensagemServidor<Cidade> | null>;
  errorGetCidade: any | any[] | null;
};

const useGetCidade = (): UseGetCidadeProps => {
  const { getDataById } = useApi<Cidade>();
  const { setLoading, showAlert } = useAlert();
  const [errorGetCidade, setErrorGetCidade] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const findCidadeById = async (id: string): Promise<MensagemServidor<Cidade> | null> => {
    setLoading(true);
    try {
      const response = await getDataById(id, ROTA.CIDADE.POR_ID);
      const { mensagem, status } = response.data;
      setErrorGetCidade(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorGetCidade(dados);
      showAlert(mensagem, DANGER, TIME);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    findCidadeById,
    errorGetCidade,
  };
};

export default useGetCidade;
