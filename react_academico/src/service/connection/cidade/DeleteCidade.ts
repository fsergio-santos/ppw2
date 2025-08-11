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

type UseDeleteCidadeProps = {
  deleteCidadeById: (id: string) => Promise<MensagemServidor<Cidade> | undefined>;
  errorDeleteCidade: any | any[] | null;
};

const useDeleteCidade = (): UseDeleteCidadeProps => {
  const { deleteData } = useApi<Cidade>();
  const { setLoading, showAlert } = useAlert();
  const [errorDeleteCidade, setErrorDeleteCidade] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const deleteCidadeById = async (id: string): Promise<MensagemServidor<Cidade> | undefined> => {
    setLoading(true);
    try {
      const response = await deleteData(id, ROTA.CIDADE.EXCLUIR);
      const { mensagem, status } = response.data;
      setErrorDeleteCidade(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorDeleteCidade(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteCidadeById,
    errorDeleteCidade,
  };
};

export default useDeleteCidade;
