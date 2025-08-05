import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { Cidade } from '../../../type/Cidade';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseInsertCidadeProps = {
  insertCidade: (dados: Cidade) => Promise<MensagemServidor<Cidade> | undefined>;
  errorInsertCidade: any | any[] | null;
};

const useInsertCidade = (): UseInsertCidadeProps => {
  const { postData } = useApi<Cidade>();
  const { setLoading, showAlert } = useAlert();
  const { tratarErrosApi } = useApiResponseHandler();
  const [errorInsertCidade, setErrorInsertCidade] = useState<any | any[] | null>(null);

  const insertCidade = async (dados: Cidade): Promise<MensagemServidor<Cidade> | undefined> => {
    setLoading(true);
    try {
      const response = await postData(ROTA.CIDADE.CRIAR, dados);
      const { mensagem, status } = response.data;
      setErrorInsertCidade(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorInsertCidade(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    insertCidade,
    errorInsertCidade,
  };
};

export default useInsertCidade;
