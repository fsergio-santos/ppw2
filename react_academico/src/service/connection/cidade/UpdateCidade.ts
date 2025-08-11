import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { Cidade } from '../../../type/Cidade';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import MESSAGES from '../../errors/Mensagens';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseUpdateCidadeProps = {
  updateCidade: (id: string, dados: Cidade) => Promise<MensagemServidor<Cidade> | undefined>;
  errorUpdateCidade: any | any[] | null;
};

const useUpdateCidade = (): UseUpdateCidadeProps => {
  const { putData } = useApi<Cidade>();
  const { setLoading, showAlert } = useAlert();
  const [errorUpdateCidade, setErrorUpdateCidade] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const updateCidade = async (id: string | number, dados: Cidade): Promise<MensagemServidor<Cidade> | undefined> => {
    setLoading(true);
    try {
      const response = await putData(id, ROTA.CIDADE.ATUALIZAR, dados);
      const { mensagem, status } = response.data;
      setErrorUpdateCidade(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorUpdateCidade(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    updateCidade,
    errorUpdateCidade,
  };
};

export default useUpdateCidade;
